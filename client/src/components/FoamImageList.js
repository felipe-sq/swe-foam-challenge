import React from "react";

const FoamImageList = (props) => {
  const { handleFoam, images } = props;
  const foamImagesFromServer = images.filter(
    (image) => image.category === "foam"
  );

  console.log(foamImagesFromServer);
  console.log(images);

  return (
    <>
      <div className="foam-images">
        {foamImagesFromServer.length === 0 ? (
          <h5>No images are currently tagged...</h5>
        ) : (
          foamImagesFromServer.map((image) => {
            return (
              <div key={image.id} className="foam-image-grid">
                <img width="250" src={image.url} alt="foaming" key={image.id} />
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
          })
        )}
      </div>
    </>
  );
};

export default FoamImageList;
