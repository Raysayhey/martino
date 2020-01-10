import React, { Component, Fragment } from 'react';

import Carousel, { Modal, ModalGateway } from 'react-images';
import { Gallery, Image } from './style';
import Img from "gatsby-image"

class GridImages extends Component {
  state = {
    selectedIndex: 0,
    lightboxIsOpen: false,
  };
  toggleLightbox = (selectedIndex) => {
    this.setState(state => ({
      lightboxIsOpen: !state.lightboxIsOpen,
      selectedIndex,
    }));
  };
  render() {
    const { images, isLoading } = this.props;
    const { selectedIndex, lightboxIsOpen } = this.state;

    return (
      <Fragment>
        {(!isLoading && images.length) ? (
          <Gallery>
            {images.map(({ author, caption, source, fluid }, j) => (
              <Image onClick={() => this.toggleLightbox(j)} key={source.thumbnail}>
                <Img
                  sizes={fluid}
                />
              </Image>
            ))}
          </Gallery>
        ) : null}

        <ModalGateway>
          {lightboxIsOpen && !isLoading ? (
            <Modal onClose={this.toggleLightbox}>
              <Carousel
                // components={{ FooterCaption }}
                currentIndex={selectedIndex}
                // formatters={{ getAltText }}
                style={{
                  view: (base) => ({
                    ...base,
                    height: '80vh',
                  }),
                  container : () => ({
                    maxHeight: '80vh'
                  })
                }}
                frameProps={{ autoSize: 'height' }}
                views={images}
              />
            </Modal>
          ) : null}
        </ModalGateway>
      </Fragment>
    );
  }
};

export default GridImages;