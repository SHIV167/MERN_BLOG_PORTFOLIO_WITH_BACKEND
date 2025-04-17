import React from 'react';
import Slider from 'react-slick';

// Only one arrow (next) will be shown, styled as before
const SliderArrow = (props) => {
  const { className, style, onClick, arrowType } = props;
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
        right: arrowType === 'next' ? -18 : undefined,
        left: arrowType === 'prev' ? -18 : undefined,
        zIndex: 2,
        boxShadow: "0 2px 6px rgba(0,0,0,0.2)",
        fontSize: 18,
        cursor: "pointer",
      }}
      aria-label={arrowType === 'next' ? 'Next Slide' : 'Previous Slide'}
      onClick={onClick}
    >
      {arrowType === 'next' ? '→' : '←'}
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
    prevArrow: <SliderArrow arrowType="prev" />, // Show single style for prev
    nextArrow: <SliderArrow arrowType="next" />, // Show single style for next
    centerMode: false,
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
        <div key={item._id || idx} style={{ padding: '0 12px', minWidth: 320 }}>
          {renderItem(item)}
        </div>
      ))}
    </Slider>
  );
};

export default SliderSection;
