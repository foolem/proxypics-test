class OrdersController < ApplicationController
  before_action :set_order, only: [:show, :update, :destroy]
  before_action :set_filters, only: [:index]

  # GET /orders
  def index
    @orders = @orders.map do |order|
      order.attributes.merge(
        photos_number: order.photos.count
      )
    end

    render json: @orders
  end

  # GET /orders/1
  def show
    render json: @order
  end

  # POST /orders
  def create
    @order = Order.new(order_params)
    
    if @order.save
      render json: @order, status: :created, location: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /orders/1
  def update
    if @order.update(order_params)
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  # DELETE /orders/1
  def destroy
    if @order.destroy
      render json: @order
    else
      render json: @order.errors, status: :unprocessable_entity
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_order
      @order = Order.find(params[:id])
    end

    def set_filters
      @orders = Order.where(state: meta_params[:state])
      
      @orders = @orders.where(
        "created_at >= ? AND created_at <= ?", 
        meta_params[:created_at].to_date.beginning_of_day, 
        meta_params[:created_at].to_date.end_of_day
      ) if meta_params[:created_at].present?
      
      @orders = @orders.where(
        "address ILIKE ?", 
        "%#{meta_params[:address].downcase}%" 
      ) if meta_params[:address].present?
    end

    # Only allow a trusted parameter "white list" through.
    def order_params
      params.require(:order).permit(:address, :latitude, :longitude)
    end

    def meta_params
      params.require(:meta).permit(:state, :created_at, :address)
    end
    
end
