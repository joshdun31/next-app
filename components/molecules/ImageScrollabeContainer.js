import React from 'react';
import { ScrollMenu, VisibilityContext } from 'react-horizontal-scrolling-menu';
import Image from "next/image";
import styles from '../../scss/components/poster.module.scss';
const arrowButtonStyle={"width":"20px","height":"20px"}

function ImageScrollableContainer({data,imageSelect}) {
  const [selected, setSelected] = React.useState([]);
  const [position, setPosition] = React.useState(0);

  const isItemSelected = (id) => !!selected.find((el) => el === id);

  const handleClick =
    (id) =>
    ({ getItemById, scrollToItem }) => {
      const itemSelected = isItemSelected(id);

      setSelected((currentSelected) =>
        itemSelected
          ? currentSelected.filter((el) => el !== id)
          : currentSelected.concat(id)
      );
    };

  return (
    <ScrollMenu LeftArrow={LeftArrow} RightArrow={RightArrow}>
      {data.map((item,index) => (
        <Card
          itemId={item.id} // NOTE: itemId is required for track items
          item={item}
          title={item.id}
          key={item.id}
          index={index}
          imageSelect={imageSelect}
          onClick={handleClick(item.id)}
          selected={isItemSelected(item.id)}
        />
      ))}
    </ScrollMenu>
  );
}

function LeftArrow() {
  const { isFirstItemVisible, scrollPrev } =
    React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isFirstItemVisible} onClick={() => scrollPrev()}>
        <img src="https://res.cloudinary.com/dkmxj6hie/image/upload/v1645887745/left-arrow_yy3y4k.png" style={arrowButtonStyle}  alt="" srcSet="" />
    </Arrow>
  );
}

function RightArrow() {
  const { isLastItemVisible, scrollNext } = React.useContext(VisibilityContext);

  return (
    <Arrow disabled={isLastItemVisible} onClick={() => scrollNext()}>
        <img src="https://res.cloudinary.com/dkmxj6hie/image/upload/v1645887745/right-arrow_wfidzd.png" style={arrowButtonStyle}  alt="" srcSet="" />
      
    </Arrow>
  );
}

function Card({ onClick, selected, title, itemId,item,index,imageSelect }) {
  const visibility = React.useContext(VisibilityContext);
  return (
    <div
      onClick={() => onClick(visibility)}
      tabIndex={0}
    >
      <div>
          <div className={styles.i_poster_container} onClick={()=>imageSelect(index)}>
              <Image
                  src={"https://image.tmdb.org/t/p/w780" + item.file_path}
                  layout="fill"
                  placeholder="blur"
                  objectFit="cover"
                  blurDataURL={"https://image.tmdb.org/t/p/w780" + item.file_path}
                  alt={item.title}
              />
          </div>
        </div>
    </div>
  );
}

function Arrow({
    children,
    disabled,
    onClick
  }) {
    return (
      <button
        disabled={disabled}
        onClick={onClick}
        style={{
          cursor: "pointer",
          display: "flex",
          border:"none",
          flexDirection: "column",
          justifyContent: "center",
          right: "1%",
          opacity: disabled ? "0" : "1",
          visibility:disabled?"hidden":"visible",
          userSelect: "none",
          background:"transparent"
        }}
      >
        {children}
      </button>
    );
  }

export default ImageScrollableContainer;