import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

const Carousel = ({ data }) => {
  const [trend, setTrend] = useState([]);
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    if (data) {
      findTrending(data);
    }
  }, []);

  const findTrending = (data) => {
    let newData = data.filter((item, i) => {
      return item.trending == "yes";
    });

    setTrend(newData);
  };

  return (
    <div>
      <Slider className="carousel" {...settings}>
        {trend.map((item, i) => {
          const { imgurl, title, id } = item;
          return (
            <Link className="link" to={`/detail/${id}`}>
              <div key={i} className="cards">
                <div className="con">
                  <div className="imgcon">
                    <img src={imgurl} alt="" srcset="" />
                    <div className="name">
                      <h3>{title}</h3>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </Slider>
    </div>
  );
};

export default Carousel;
