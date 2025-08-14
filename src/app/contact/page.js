"use client";
import Image from "next/image";
import ContactForm from "@/components/ContactForm";


export default function ContactUs() {
    return (
        <div>
<section data-section="contact_banner" className="contact_banner inner_banner">
    <picture>
        <source media="(max-width: 540px)" srcSet="/images/mob_contact.webp" />
        <Image src="/images/contact.webp" alt="" className="banner_img" width="1920" height="1080" />
    </picture>
    <div className="inner_banner_container">
        {/* <h2 className="subtitle_473">Contact us</h2> */}
        <div className="subtitle_10877">
            The Gateway to Your Growth Journey.
        </div>
    </div>
</section>

<ContactForm />

<iframe id="contactForm" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3772.722269460985!2d72.82657847520314!3d18.987869182198697!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7ce5ff0c91c61%3A0x99e5f5f575271292!2sLodha%20Excelus!5e0!3m2!1sen!2sin!4v1754652794392!5m2!1sen!2sin" width="600" height="450" style={{border:0}} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade">
</iframe>


        </div>
        
    )
}