"use client";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Settings } from "react-slick";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "next/link";
interface IProps {
  data: ITrackTop[];
}
function MainSlider(props: IProps) {
  const { data } = props;
  const NextArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          right: 0,
          top: "25%",
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronRightIcon />
      </Button>
    );
  };
  const PrevArrow = (props: any) => {
    return (
      <Button
        color="inherit"
        variant="contained"
        onClick={props.onClick}
        sx={{
          position: "absolute",
          top: "25%",
          left: 0,
          zIndex: 2,
          minWidth: 30,
          width: 35,
        }}
      >
        <ChevronLeftIcon />
      </Button>
    );
  };
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  return (
    <Box
      sx={{
        margin: "0 50px",
        ".track": {
          padding: "0 10px",
          img: {
            margin: "0 auto",
            width: "100%",
            height: "200px",
          },
          a: {
            textDecoration: "none",
            color: "unset",
          },
        },
      }}
    >
      <h2>Tracks {data[0].category}</h2>
      <Slider {...settings}>
        {data.map((item, index) => {
          return (
            <div className="track" key={item._id}>
              <img
                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${item.imgUrl}`}
                alt={item.title}
              />
              <Link href={`/track/${item._id}?audio=${item.trackUrl}`}>
                <h4 style={{ cursor: "pointer" }}>{item.title}</h4>
              </Link>
              <h5>{item.description}</h5>
            </div>
          );
        })}
      </Slider>
    </Box>
  );
}

export default MainSlider;
