import React, { Component } from "react";
import "react-dates/initialize";
import Dropzone from "react-dropzone";




class ImagesForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
        maxSize : 3145728,//3Mb
        images:[],
        imagesAdded:false

    };
  }

  handleOnDrop= (files, rejectedfiles) =>{
   if(files.length>5){
       alert("Exceeded Photo Limit, Choosing only 1st 5 Images");
   }
        let  n =files.length;
        if(n>5){
            n=5;
        }
        
        for(let i=0;i<n;i++){
            const reader = new FileReader();
            reader.addEventListener("load", () =>{
                this.setState({
                    
                    images: this.state.images.concat({imgSrc: reader.result, imgCount:i+1}),
                    imagesAdded:true

                    
                })
            },false)

            reader.readAsDataURL(files[i])
        }
   
}

  render() {

    let thumbnails = this.state.images.map(image => {
        return(
            <li>

            <img
              data-toggle="modal" data-target={"#imagemodal"+image.imgCount}
              src={image.imgSrc}
              alt="..."
              className ="img-thumbnail resize"
            />

        

          </li>
        )
    })

    let uploadButton = (this.state.imagesAdded ? <button
        type="button"
        class=" roundcornerbutton  btn-lg btn btn-primary"
      >
        Upload
      </button> : null);


    let modals = this.state.images.map(image => {
        return(
    

             <div class="modal fade bd-example-modal-lg" id={"imagemodal"+image.imgCount} tabindex="-1" role="dialog" >
            <div class="modal-dialog modal-lg">
                <div class="modal-content">
                <img
              data-toggle="modal" data-target={"#imagemodal"+image.imgCount}
              src={image.imgSrc}
              alt="..."
              className ="img resizeModal"
            /> 
                </div>
            </div>
            </div>

         
        )
    })
    return (
      <div className="col-9">
        <div class="card  sharpEdges shadow-lg">
          <div class="card-body ">
            <h5 class="card-title">Upload Photos</h5>
            <hr />
            <p class="card-text text-center ">
              <div className="dottedbox">
                <br />
                <br />
                <br />

                <div className="container">
                  <Dropzone
                    className="dropzone"
                    multiple={true}
                    accept="image/jpeg, image/png"
                    maxSize={this.maxSize}
                    onDrop={this.handleOnDrop}
                  >
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                    <div>
                      Try dropping some files here, or click to select files to
                      upload.
                    </div>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                  </Dropzone>
                </div>

                <br />
                <br />

                <ul className="imagelist">
                {thumbnails}
                </ul>
                <br />
                <br />
               
                  {uploadButton}
                
               
                <br />
                <br />
                <br />
              </div>
              <br />
              <div className="row">
                <div className="col-2 offset-2">
                  <button
                    type="button"
                    class="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  >
                    Back
                  </button>
                </div>
                <div className="col-2 offset-4">
                  <button
                    type="button"
                    class="viewProfileButton roundcornerbutton somePaddingforButtons btn-lg btn btn-primary"
                  >
                    Next
                  </button>
                </div>
              </div>
            </p>
          </div>
        </div>
        <br />
        <br />
        <br />
        <br />
        <br />
        {modals}

           

      </div>
    );
  }
}

export default ImagesForm;
