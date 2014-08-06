class ArticlesController < ApplicationController

  def create
    @user = User.find(session[:user_id]) if session[:user_id]
    binding.pry
    unless @user.articles.find_by(title: params[:article][:title])
      @article = Article.create(article_params) 
      @user.articles << @article
    end

   
    respond_to do |format|
      if @article.save
        format.json { render json: @article}
      else
        format.json { render json: @article.errors, status: :unprocessable_entity }
      end
    end
  end


  private

  def article_params
    params.require(:article).permit(:title, :abstract, :url, :pubdate)
  end 


end
