class PhotosController < ApplicationController
  before_action :set_order
  before_action :set_photo, only: [:show, :update, :destroy]

  # GET /photos
  def index
    @photos = @order.photos

    render json: @photos
  end

  # GET /photos/1
  def show
    render json: @photo
  end

  # POST /photos
  def create
    @photo = Photo.new(photo_params)

    if @photo.save
      render json: @photo, status: :created
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /photos/1
  def update
    if @photo.update(photo_params)
      render json: @photo
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  # DELETE /photos/1
  def destroy
    if @photo.destroy
      render json: @photo
    else
      render json: @photo.errors, status: :unprocessable_entity
    end
  end

  private
    def set_photo
      @photo = Photo.find(params[:id])
    end

    def set_order
      @order = Order.find(params[:order_id])
    end

    def photo_params
      params.require(:photo).permit(:order_id, :resource_url)
    end
end
