class NightclubsController < ApplicationController
  before_action :set_nightclub, only: [:show ]

  # GET /nightclubs
  # GET /nightclubs.json
  def index
    @nightclubs = Nightclub.all
  end

  # GET /nightclubs/1
  # GET /nightclubs/1.json
  def show
  end

  # GET /nightclubs/new
  def new
    @nightclub = Nightclub.new
  end

  # GET /nightclubs/1/edit
  def edit
  end

  # POST /nightclubs
  # POST /nightclubs.json
  def create
    @nightclub = Nightclub.new(nightclub_params)

    respond_to do |format|
      if @nightclub.save
        format.html { redirect_to @nightclub, notice: 'Nightclub was successfully created.' }
        format.json { render action: 'show', status: :created, location: @nightclub }
      else
        format.html { render action: 'new' }
        format.json { render json: @nightclub.errors, status: :unprocessable_entity }
      end
    end
  end

  # PATCH/PUT /nightclubs/1
  # PATCH/PUT /nightclubs/1.json
  def update
    respond_to do |format|
      if @nightclub.update(nightclub_params)
        format.html { redirect_to @nightclub, notice: 'Nightclub was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: 'edit' }
        format.json { render json: @nightclub.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /nightclubs/1
  # DELETE /nightclubs/1.json
  def destroy
    @nightclub.destroy
    respond_to do |format|
      format.html { redirect_to nightclubs_url }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_nightclub
      @nightclub = Nightclub.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def nightclub_params
      params.require(:nightclub).permit(:name, :address, :phone_number, :image, :description)
    end
end
