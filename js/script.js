
    function submitForm(e){
      e.preventDefault();
      const name=document.getElementById('name').value.trim();
      const phone=document.getElementById('phone').value.trim();
      const trip=document.getElementById('tripType').value;
      const dt=document.getElementById('datetime').value;
      const notes=document.getElementById('notes').value.trim();
      const msg=document.getElementById('formMsg');

      
      if(!name||!phone){
         msg.textContent='कृपया नाम और फोन भरें';
         return false
        }


      const text = encodeURIComponent(`नमस्ते Ham Safar,
बुकिंग के लिए जानकारी:
नाम: ${name}
फोन: ${phone}
ट्रिप: ${trip}
दिनांक/समय: ${dt}
नोट्स: ${notes}`);
      const waLink = `https://wa.me/919452072543?text=${text}`;
      window.open(waLink,'_blank');
      msg.textContent='धन्यवाद! हम जल्द कॉल करके पुष्टि करेंगे — WhatsApp भेजा गया है।';


      document.getElementById('datetime').value='';
      document.getElementById('notes').value='';
      return false;
    }

  

    // Gallery Slider
    let index=0;
    const slides=document.getElementById("slides");
    const totalSlides=slides.children.length;
    const dotsContainer=document.getElementById("dotsContainer");
    const dots=[];


    for(let i=0;i<totalSlides;i++){
      const dot=document.createElement("span");
      dot.classList.add("dot");
      dot.onclick=()=>showSlide(i);
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }


    function updateDots(){
      dots.forEach(d=>d.classList.remove("active"));
      dots[index].classList.add("active")
    }

    function showSlide(i){
      index=(i+totalSlides)%totalSlides;
      slides.style.transform=`translateX(${-index*100}%)`;
      updateDots()
    }


    function moveSlide(step){showSlide(index+step)}
    showSlide(index);
    setInterval(()=>{moveSlide(1)},6000);

    // Map Switcher
 function changeMap(view) {
  const mapFrame = document.getElementById("mapFrame");
  let url = "";

  if (view === "wide") {
    url = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d5682.947289324244!2d83.238012!3d26.023479!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991178a4a0a0b25%3A0xe5d4b6f0a9811f01!2sBhimlapur%2C%20Pawai%2C%20Azamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694612345678!5m2!1sen!2sin";
  }
  else if (view === "medium") {
    url = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1420.736!2d83.238012!3d26.023479!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991178a4a0a0b25%3A0xe5d4b6f0a9811f01!2sBhimlapur%2C%20Pawai%2C%20Azamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694612345678!5m2!1sen!2sin";
  }
  else if (view === "close") {
    url = "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d710.368!2d83.238012!3d26.023479!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3991178a4a0a0b25%3A0xe5d4b6f0a9811f01!2sBhimlapur%2C%20Pawai%2C%20Azamgarh%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1694612345678!5m2!1sen!2sin";
  }

  mapFrame.src = url;
}

function revealOnScroll() {
  const reveals = document.querySelectorAll(".reveal");
  for (let i = 0; i < reveals.length; i++) {
    const windowHeight = window.innerHeight;
    const elementTop = reveals[i].getBoundingClientRect().top;
    if (elementTop < windowHeight - 80) {
      reveals[i].classList.add("active");
    }
  }
}
window.addEventListener("scroll", revealOnScroll);
