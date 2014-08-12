class ArticlesController < ApplicationController

  def create
    @user = User.find(session[:user_id]) if session[:user_id]
    unless @user.articles.find_by(title: params[:article][:title])
      @article = Article.create(article_params) 
      @user.articles << @article
      @user.save
    end
   
    respond_to do |format|
      if @user.save
        format.json { render json: @article }
      else
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end

  def index
    @user = User.find(session[:user_id]) if session[:user_id]
    @articles = @user.articles.reverse #So that newest are on top of list
    render json: @articles  
  end 

  def destroy
    @user = User.find(session[:user_id]) if session[:user_id]
    article_url = params[:delete_request][:url]
    if @user.articles.find_by(url: article_url)
      @article = @user.articles.find_by(url: article_url)
      @article.destroy
      @user.save
    end
    
    respond_to do |format|
      if @user.save
        format.json { render json: user_articles(@user)}
      else
        format.json { head :no_content }
      end
    end
  end

  private

  def article_params
    params.require(:article).permit(:title, :abstract, :url, :pubdate, :image)
  end 


end
