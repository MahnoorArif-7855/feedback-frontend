import styled from 'styled-components';

const CarouselCardStyled = styled.div`
  cursor: pointer;

  .carousel-img {
    width: 100%;
    height: auto;
  }

  .img {
    border-radius: 14px;
  }

  .card-desc {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    padding-left: 30px;
    padding-right: 30px;
  }

  .sub-heading {
    margin-bottom: 28px;
  }

  .carousel-sub-title {
    font-size: 14px;
    color: #222;
    font-weight: 600;
  }
  .carousel-divider {
    margin-right: 6px;
    margin-left: 6px;
    color: #222;
  }
  .carousel-date {
    font-size: 14px;
    color: #999;
  }

  .carousel-title {
    font-size: 40px;
    font-weight: 700;
    line-height: 40px;
  }

  .carousel-title-desc {
    margin-top: 20px;
  }

  .desc {
    color: #888;
    font-size: 16px;
  }

  .avatar-content {
    margin-top: 30px;
  }

  .avatar {
    display: flex;
    flex-direction: column;
  }

  .avatar-title {
    font-weight: 600;
    font-size: 14px;
    color: #000;
  }
  .avatar-desc {
    color: #888;
    font-size: 14px;
  }
`;

export default CarouselCardStyled;
