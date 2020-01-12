import React from 'react'
import styled from 'styled-components'
import { Container, Row, Col } from 'react-awesome-styled-grid'
import { FaGithub, FaLinkedin, FaEnvelope, FaTwitter } from "react-icons/fa"
import siteConfig from '../../data/siteConfig'

import Layout from '../components/layout'
import Hero from '../components/hero'
import SEO from '../components/SEO'
import Wrapper from '../components/wrapper'
import About from '../components/about'
import Skills from '../components/skills'
import Timeline from '../components/timeline'
import GridImages from '../components/grid-images'
import Repositories from '../components/repositories'
import Tabs from "../components/tabs";
import { graphql } from 'gatsby'
import Carousel from 'react-images';

const Separator = styled.hr`
  margin-top: 24px;
  margin-bottom: 16px;
`

const Demo = styled.div``;

class Home extends React.Component {
  static defaultProps = {
    pageResources: {
      json: {
        data: {
          experienceGallery: { images: [] },
          hobbyGallery: { images: [] }
        }
      }
    }
  }

  render () {
    const { loading, data, pageResources } = this.props;
    const { experienceGallery, hobbyGallery } = pageResources.json.data;
    const filteredExperiencedImages = experienceGallery.images.map(image => ({
      source: image.photo.file.url,
      title: image.photo.title,
      ...image.photo
    }))
    const filteredHobbyImages = hobbyGallery.images.map(image => ({
      source: image.photo.file.url,
      title: image.photo.title,
      ...image.photo
    }))

    if (siteConfig.googleAnalyticsId === 'UA-000000000-1') {
      console.error('WARNING: Please set a proper googleAnalyticsId. See https://analytics.google.com for details.');
    }

    const title = siteConfig.siteTitle
    const {keywords} = siteConfig
    return (
      <Layout location={this.props.location}>
        <SEO
          title={title}
          keywords={keywords}
        />

        <Hero
          heroImg={siteConfig.siteCover}
          title={title}
        />

        <Wrapper className={this.props.className} >
          <Container className="page-content" fluid>
            <Row>
              <Col xs={4} className='avatar'>
                <img
                  className='avatar__image'
                  src='/images/avatar.jpeg'
                  alt='user avatar'
                />
                <div className="social">
                  {siteConfig.social.github && <a className="social-link github" href={siteConfig.social.github}>
                    <FaGithub className="social-icon" size="32" />
                  </a>}
                  {siteConfig.social.linkedin && <a className="social-link linkedin" href={siteConfig.social.linkedin}>
                    <FaLinkedin className="social-icon" size="32" />
                  </a>}
                  {siteConfig.social.twitter && <a className="social-link twitter" href={siteConfig.social.twitter}>
                    <FaTwitter className="social-icon" size="32" />
                  </a>}
                  {siteConfig.social.email && <a className="social-link email" href={`mailto:${siteConfig.social.email}`}>
                    <FaEnvelope className="social-icon" size="32" />
                  </a>}
                </div>
              </Col>
            </Row>
            <Row>
              <Col xs={4} sm={4}>
                <About title='About' text={siteConfig.authorDescription}/>
              </Col>
              <Col xs={4} sm={4}>
                <Skills title='Skills' skills={siteConfig.skills} />
              </Col>
            </Row>
            <Separator />
            <Tabs
              items={[
                ["Experience",  <FaEnvelope className="social-icon" size="32" />,<Timeline />],
                ["Gallery",  <FaEnvelope className="social-icon" size="32" />, <GridImages images={filteredExperiencedImages} isLoading={loading} />],
              ]}
            />
            <Separator />
            <div>
              <GridImages images={filteredHobbyImages} isLoading={loading} />
            </div>
            <Separator />
            <Repositories />
          </Container>
        </Wrapper>
      </Layout>
    )
  }
}

export const experienceGallery = graphql`
  {
    experienceGallery: contentfulPhotoGallery(contentful_id: {eq: "1TfXthEmsHciR8BNdaeWdA"}) {
      images {
        photo {
          file {
            fileName
            url
            contentType
          }
          title
          fluid(maxWidth: 1280) {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
    hobbyGallery: contentfulPhotoGallery(contentful_id: {eq: "1pimwQakflqVioLm9cn6SC"}) {
      images {
        photo {
          file {
            fileName
            url
            contentType
          }
          title
          fluid(maxWidth: 1280) {
            base64
            aspectRatio
            src
            srcSet
            sizes
          }
        }
      }
    }
  }
`;

export default styled(Home)`
  .page-content {
    max-width: 100%;
    margin-bottom: 40px;
  }

  .avatar {
    align-items: center;
    margin-bottom: 24px;
    flex-direction: column;
  }

  .avatar__image {
    box-shadow: 3px 3px 15px 0px rgba(0,0,0,0.75);
    max-width: 200px;
    border-radius: 100px;
    margin: 0 auto 24px;
  }

  .social {
    margin-top: 12px;
    margin-bottom: 12px;
  }

  .social-link {
    padding: 8px;
    color: #555;
  }

  a.social-link.twitter:hover {
    color: #1da1f2;
  }

  a.social-link.github:hover {
    color: #24292e;
  }

  a.social-link.linkedin:hover {
    color: #0077B5;
  }

  a.social-link.email:hover {
    color: #c23a2b;
  }
`
