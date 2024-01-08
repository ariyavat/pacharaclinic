
const Home = () => (
<section className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light" id="section-home">
  <div className="container">
    <div class="row align-items-center justify-content-center">
      <div className="col-md-6 text-center">
    
        <h2 className="heading mb-3">ระบบบริหารจัดการคลินิกเสริมความงาม</h2>
        <h3>ง่าย ใช้ได้ทุกที่ ทุกเวลา </h3>
        <div className="sub-heading">
          <p className="mb-4">ปัญหาสต็อคจะหมดไป </p>
          <p className="mb-5"><a className="btn btn-success btn-lg pb_btn-pill smoothscroll" href="#section-pricing"><span className="pb_font-14 text-uppercase pb_letter-spacing-1">See Pricing</span></a></p>
        </div>
      </div> 
      <div className="col-md-1">
      </div>
      <div className="col-md-5 relative align-self-center">
        
        <form action="#" className="bg-white rounded pb_form_v1">
          <h2 className="mb-4 mt-0 text-center">Sign Up for Free</h2>
          <div className="form-group">
            <input type="text" className="form-control pb_height-50 reverse" placeholder="Full name" />
          </div>
          <div className="form-group">
            <input type="text" class="form-control pb_height-50 reverse" placeholder="Email" />
          </div>
          <div className="form-group">
            <input type="text" className="form-control pb_height-50 reverse" placeholder="Email" />
          </div>
          <div className="form-group">
            <div className="pb_select-wrap">
              <select className="form-control pb_height-50 reverse">
                <option value="" selected>Type</option>
                <option value="">Basic</option>
                <option value="">Business</option>
                <option value="">Free</option>
              </select>
            </div>
          </div>
          <div className="form-group">
            <input type="submit" className="btn btn-primary btn-lg btn-block pb_btn-pill  btn-shadow-blue" value="Register" />
          </div>
        </form>

      </div> 
    </div>
  </div>
</section>
)

export default Home