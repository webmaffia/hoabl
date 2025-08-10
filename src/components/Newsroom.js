"use client";
import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

export default function Newsroom() {
  const textRef = useRef(null);
  const yearSliderRef = useRef(null);
  const newsSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);


  const yearSliderSettings = {
    slidesToScroll: 1,
    slidesToShow: 3,
    speed: 3500,
    asNavFor: newsSliderRef.current,
    arrows: false,
    dots: false,
    vertical: true,
    verticalSwiping: true,
    centerMode: true,
    centerPadding: '0',
    autoplay: true,
    focusOnSelect: true,
    beforeChange: (current, next) => setCurrentSlide(next)
  };

 
  const newsSliderSettings = {
    speed: 3500,
    slidesToShow: 1,
    slidesToScroll: 1,
    asNavFor: yearSliderRef.current,
    arrows: false,
    dots: false,
    vertical: true,
    verticalSwiping: true,
    autoplay: true,
    beforeChange: (current, next) => setCurrentSlide(next)
  };


  // const handleWheel = (e, sliderRef) => {
  //   e.preventDefault();
  //   if (e.deltaY < 0) {
  //     sliderRef.current?.slickNext();
  //   } else {
  //     sliderRef.current?.slickPrev();
  //   }
  // };

  useEffect(() => {
    if (!textRef.current) return;

    gsap.fromTo(
        textRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 80%",
            end: "top 60%",
            scrub: true,
          },
        }
      );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  
  const newsData = [
    {
      year: "25",
      news: [
        {
          title: "House of Abhinandan Lodha forays into vertical real estate in Mumbai - With a collective development potential of 3.1 million square feet, the company expects to generate revenue of ₹3,500 crore, with a total investment of ₹2,500 crore.",
          city: "Mumbai",
          publication: "Fortune India",
          date: "April 2025",
          link:'https://www.fortuneindia.com/business-news/house-of-abhinandan-lodha-forays-into-vertical-real-estate-in-mumbai/122398'
        },
        {
          title: "HoABL enters vertical realty business, to invest Rs 2,500 crore - The funding would be through mix of internal accruals and debt for working capital and pre- sales, said Abhinandan Lodha, Chairman of HoABL. ",
           city: "Mumbai",
           publication: "The Indian Express",
          date: "April 2025",
          link:'https://indianexpress.com/article/business/hoabl-enters-vertical-realty-business-to-invest-rs-2500-crore-9961894/'

          
        },
        {
          title: "House of Abhinandan Lodha forays into vertical real estate in Mumbai - House of Abhinandan Lodha (HoABL) announces its foray into vertical development with three Mumbai projects in Marine Lines, Chowpatty, and Naigaon, totaling 3.1 million sq ft and Rs 3,500 crore revenue potential.",
           city: "Mumbai",
           publication: "Financial Express",
          date: "April 2025",
          link:'https://www.financialexpress.com/business/industry/house-of-abhinandan-lodha-forays-into-vertical-real-estate-in-mumbai/3819805/'
        }
      ]
    },
    {
      year: "24",
      news: [
        {
          title: "House of Abhinandan Lodha buys American Center in Mumbai for ₹56 crore",
          city: "Mumbai",
          publication: "Hindustan Times",
          date: "Nov 2024",
          link:'https://www.hindustantimes.com/real-estate/house-of-abhinandan-lodha-buys-american-center-in-mumbai-for-rs-56-crore-101732957614571.html'
        },
        {
          title: "House of Abhinandan Lodha buys American Center in South Mumbai's Marine Lines",
          city: "Mumbai",
          publication: "The Economic Times",
          date: "Nov 2024",
          link:'https://economictimes.indiatimes.com/industry/services/property-/-cstruction/house-of-abhinandan-lodha-buys-american-center-in-south-mumbais-marine-lines/articleshow/115818282.cms?from=mdr'
        },
        {
          title: "Abhinandan Lodha acquires Mumbai American Centre for ₹56 crore",
          city: "Mumbai",
          publication: "The Hindu",
          date: "Dec 2024",
          link:'https://www.thehindu.com/business/Industry/abhinandan-lodha-acquires-mumbai-american-centre-for-56-crore/article68948353.ece'
        }
      ]
    },
    // {
    //   year: "23",
    //     news: [
    //     {
    //       title: "House of Abhinandan Lodha forays into vertical real estate in Mumbai - With a collective development potential of 3.1 million square feet, the company expects to generate revenue of ₹3,500 crore, with a total investment of ₹2,500 crore.",
    //       city: "Mumbai",
    //       publication: "",
    //       date: "April 2025",
    //       link:'https://www.fortuneindia.com/business-news/house-of-abhinandan-lodha-forays-into-vertical-real-estate-in-mumbai/122398'
    //     },
    //     {
    //       title: "HoABL enters vertical realty business, to invest Rs 2,500 crore - The funding would be through mix of internal accruals and debt for working capital and pre- sales, said Abhinandan Lodha, Chairman of HoABL. ",
    //        city: "Mumbai",
    //        publication: "",
    //       date: "April 2025",
    //       link:'https://indianexpress.com/article/business/hoabl-enters-vertical-realty-business-to-invest-rs-2500-crore-9961894/'

          
    //     },
    //     {
    //       title: "House of Abhinandan Lodha forays into vertical real estate in Mumbai - House of Abhinandan Lodha (HoABL) announces its foray into vertical development with three Mumbai projects in Marine Lines, Chowpatty, and Naigaon, totaling 3.1 million sq ft and Rs 3,500 crore revenue potential.",
    //        city: "Mumbai",
    //        publication: "",
    //       date: "April 2025",
    //       link:'https://www.financialexpress.com/business/industry/house-of-abhinandan-lodha-forays-into-vertical-real-estate-in-mumbai/3819805/'
    //     }
    //   ]
    // },
    // {
    //   year: "22",
    // news: [
    //     {
    //       title: "House of Abhinandan Lodha buys American Center in Mumbai for ₹56 crore",
    //       city: "Mumbai",
    //       publication: "",
    //       date: "Nov 2024",
    //       link:'https://www.hindustantimes.com/real-estate/house-of-abhinandan-lodha-buys-american-center-in-mumbai-for-rs-56-crore-101732957614571.html'
    //     },
    //     {
    //       title: "House of Abhinandan Lodha buys American Center in South Mumbai's Marine Lines",
    //       city: "Mumbai",
    //       publication: "",
    //       date: "Nov 2024",
    //       link:'https://economictimes.indiatimes.com/industry/services/property-/-cstruction/house-of-abhinandan-lodha-buys-american-center-in-south-mumbais-marine-lines/articleshow/115818282.cms?from=mdr'
    //     },
    //     {
    //       title: "Abhinandan Lodha acquires Mumbai American Centre for ₹56 crore",
    //       city: "Mumbai",
    //       publication: "",
    //       date: "Dec 2024",
    //       link:'https://www.thehindu.com/business/Industry/abhinandan-lodha-acquires-mumbai-american-centre-for-56-crore/article68948353.ece'
    //     }
    //   ]
    // }
  ];

  return (
    <section data-section="news_section" className="news_section">
      <div className="news_heading">
        <h2 className="subtitle_12161 textAni">Newsroom</h2>
      </div>
      <div className="news_container">
        <div className="news_section_slider">
          <div className="year_wrapper">
            <span className="year_text">20</span>
            <div 
              className="year_slider"
              onWheel={(e) => handleWheel(e, yearSliderRef)}
            >
              <Slider ref={yearSliderRef} {...yearSliderSettings}>
                {newsData.map((item, index) => (
                  <div key={index} className={`item_year ${currentSlide === index ? 'active' : ''}`}>
                    {item.year}
                  </div>
                ))}
              </Slider>
            </div>
          </div>
          <div className="news_slider_container">
            <div 
              className="news_slider"
              onWheel={(e) => handleWheel(e, newsSliderRef)}
            >
              <Slider ref={newsSliderRef} {...newsSliderSettings}>
                {newsData.map((yearData, yearIndex) => (
                  <div key={yearIndex} className="news_item">
                    <div className="news_wrapper">
                      <ul>
                        {yearData.news.map((newsItem, newsIndex) => (
                          <li key={newsIndex}>
                            <a href={newsItem.link} className="news_link" target="_blank">
                                <div className="news_span">
                              <span>{newsItem.title}</span>
                                </div>

                            </a>
                            <div className="city_year">
                              <div className="cy_text text_bg">{newsItem.city}</div>
                              <div className="cy_text text_bg">{newsItem.date}</div>
                              <div className="cy_text text_bg">{newsItem.publication}</div>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
} 