import React, { useEffect, useState } from "react";
import { Card, Container } from "react-bootstrap";
import FoamImageList from "./FoamImageList";
import axios from "axios";

const ImagesList = (props) => {
  const [images, setImages] = useState([]);
  const [nextImageSet, setNextImageSet] = useState("");
  const [foam, setFoam] = useState(false);
  const [foamImages, setFoamImages] = useState([]);
  const [itemOffset, setItemOffset] = useState(0);
  const imagesPerPage = 8;

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/`).then((response) => {
      setImages(response.data);
      setNextImageSet(response.data[response.data.length - 1]);
      console.log(response.data);
    });
  }, []);

  const handleLoadMoreButton = async (e) => {
    e.preventDefault();

    const newOffset = itemOffset + imagesPerPage;

    console.log(
      `User has requested image set ${itemOffset}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handlePreviousImageSetButton = async (e) => {
    e.preventDefault();

    const newOffset = itemOffset - imagesPerPage;

    console.log(
      `User has requested previous image set ${itemOffset}, which is offset -${newOffset}`
    );
    setItemOffset(newOffset);
  };

  const handleFoam = (image) => {
    if (image.category === "uncategorized") {
      image.category = "foam";
      image.foam = 1;
    } else if (image.category === "foam") {
      image.category = "no-foam";
      image.foam = 0;
    } else {
      image.category = "foam";
    }

    axios
      .put(`${process.env.REACT_APP_API_URL}/${image.id}`, image)
      .then((response) => {
        console.log(response.data);
        console.log("Image category updatged!", image.category);
        setFoam(!foam);
      });
  };

  const handleFoamButton = async (e) => {
    if (foamImages.length > 0) {
      foamImages
        .filter((image) => image.category === "uncategorized")
        .map((image) => {
          return (image.category = "foam");
        });
      setFoam(false);
    } else {
      foamImages.map((image) => {
        return (image.category = "no-foam");
      });
      setFoam(true);
    }
    setFoam(!foam);
  };

  const currentImageDisplay = images.slice(
    itemOffset,
    itemOffset + imagesPerPage
  );

  return (
    <>
      <div className="image-load-nav">
        <span className="load-previous">
          {itemOffset > 0 && (
            <button onClick={handlePreviousImageSetButton}>
              {"<< Load Previous"}
            </button>
          )}
        </span>
        <span className="load-more">
          {nextImageSet && (
            <button onClick={handleLoadMoreButton}> {"Load Next >>"} </button>
          )}
        </span>
        <span className="foam">
          <button className="foam-button" onClick={handleFoamButton}>
            {"Highlight Foam Images"}
          </button>
        </span>
      </div>
      <Container>
        <Card>
          <Card.Body>
            {foam && <FoamImageList handleFoam={handleFoam} images={images} />}
          </Card.Body>
        </Card>
      </Container>
      <Container>
        <Card>
          <Card.Body className="image-grid">
            {currentImageDisplay.map((image) => {
              return (
                <div key={image.id}>
                  <img width="250" src={image.url} alt="possible foam images" />
                  <div>
                    Category: <strong>{image.category}</strong>
                  </div>
                  <br />
                  <div>
                    Location: <em>{image.lastModified}</em>
                  </div>
                  <br />
                  <div>ID: {image.id}</div>
                  <br />
                  <button
                    className="foam-status-button"
                    id={image.id}
                    name="foam"
                    value={image}
                    onClick={() => handleFoam(image)}
                  >
                    Toggle Foam Tag <br />
                  </button>
                  <br />
                </div>
              );
            })}
          </Card.Body>
        </Card>
      </Container>
    </>
  );
};

export default ImagesList;
