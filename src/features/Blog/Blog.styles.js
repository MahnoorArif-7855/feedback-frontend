import { Carousel } from 'antd';
import styled from 'styled-components';

const BlogStyled = styled.div`
  .container {
    padding-top: 1rem;
    padding-right: 8rem;
    padding-left: 8rem;
  }
  .header {
    width: 100%;
    text-align: center;
  }
  .heading {
    font-size: 40px;
    font-weight: 700;
    color: #000;
  }
  .blog-cards {
    margin-top: 10rem;
  }

  .popular-blogs {
    margin-top: 10rem;
    text-align: center;
  }

  .popular-blog-title {
    font-size: 40px;
    font-weight: 700;
  }

  .popular-carousel {
    margin-top: 4rem;
    margin-bottom: 5rem;
  }

  .category {
    padding-bottom: 8rem;
  }

  .sports {
    margin-bottom: 4rem;
  }
  .sports-title {
    font-weight: 600;
    font-size: 40px;
  }

  .blog-content {
    cursor: pointer;
    border: 1px solid #000;
    padding: 8px;
    background: rgba(189, 188, 185, 0.4);
    border-radius: 8px;
    margin-top: 14px;
  }

  .blogs-list {
    height: 45em;
    overflow: scroll;
  }
`;

const CarouselWrapper = styled(Carousel)`
  > .slick-dots li button {
    width: 6px;
    height: 6px;
    border-radius: 100%;
    background: #888;
  }
  > .slick-dots li.slick-active button {
    width: 7px;
    height: 7px;
    border-radius: 100%;
    background: #f79918;
  }
`;

export { BlogStyled, CarouselWrapper };
