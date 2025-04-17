import React from 'react';
import Slider from 'react-slick';

const PrevArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#2D3748",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 36,
        height: 36,
        left: -18,
        zIndex: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        fontSize: 18,
        cursor: "pointer",
      }}
      aria-label="Previous Slide"
      onClick={onClick}
    >
      &#8592;
    </button>
  );
};

const NextArrow = (props) => {
  const { className, style, onClick } = props;
  return (
    <button
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#2D3748",
        color: "#fff",
        border: "none",
        borderRadius: "50%",
        width: 36,
        height: 36,
        right: -18,
        zIndex: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        fontSize: 18,
        cursor: "pointer",
      }}
      aria-label="Next Slide"
      onClick={onClick}
    >
      &#8594;
    </button>
  );
};

const SliderSection = ({ items, renderItem, slidesToShow = 3, ...props }) => {
  const settings = {
    dots: true,
    infinite: items.length > slidesToShow,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <PrevArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };
  return (
    <Slider {...settings} {...props}>
      {items.map((item, idx) => (
        <div key={item._id || idx} style={{ margin: '0 24px', minWidth: 320, padding: 0 }}>
          {renderItem(item)}
        </div>
      ))}
    </Slider>
  );
};

export default SliderSection;
