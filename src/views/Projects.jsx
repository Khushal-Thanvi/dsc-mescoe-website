import {
  Toolbar,
  Button,
  CardActionArea,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Fade,
  Backdrop,
  Modal
} from '@material-ui/core';
import React from 'react';
import axios from 'axios';
import {resetNavStyle} from "../utils/utils";
import {Container, Row, Col, ResponsiveEmbed, Form} from 'react-bootstrap';

import GitHubIcon from '@material-ui/icons/GitHub';
import YouTubeIcon from '@material-ui/icons/YouTube';


export default class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],

      title: '',
      description: '',
      image: '',
      youtube: '',
      github: '',

      openUp: true,
      open: false,
      cardWidth: 700,
      cardHeight: 900,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit = event => {
    event.preventDefault();

    axios.post(`http://localhost:5000/api/projects`, {
      title: this.state.title,
      description: this.state.description,
      image: this.state.image,
      youtube: this.state.youtube,
      github: this.state.github
    })
      .then(res => {
        console.log(res);
        console.log(res.data);
        this.handleClose();
        window.location.reload();
      }).catch(err => {
      console.error(err.message);
    });
  }

  componentDidMount() {
    document.title = 'Projects - DSC MESCOE';
    resetNavStyle({page: 'Projects'});

    axios.get(`http://localhost:5000/api/projects/`)
      .then(res => {
        console.log(res);
        this.setState({projects: res.data});
      })
      .catch(err => console.error(err.message));

    console.log(window.innerWidth);
    if (this.props.index > 0) {
      if (window.innerWidth <= 576) {
        this.accordion.click();
      }
    }
    if (window.innerWidth <= 1024) {
      this.setState({cardWidth: window.innerWidth * 0.8, cardHeight: window.innerHeight * 0.8});
    }
  }

  handleOpen = () => {
    this.setState({open: true});
  }

  handleClose = () => {
    this.setState({open: false});
  }

  clickEvent = () => {
    this.handleOpen();
  }

  render() {
    return (
      <Toolbar className="p-0">

        {this.state.open ?
          <Modal
            style={{
              top: (window.innerHeight * 0.2),
              margin: "auto",
              width: this.state.cardWidth,
              height: this.state.cardHeight,
              padding: 20,
            }}
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            open={this.state.open}
            onClose={this.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            disableAutoFocus={true}
          >
            <Fade in={this.state.open}>
              <Card style={{borderRadius: 10}}>
                <CardContent>
                  <Form onSubmit={this.handleSubmit}>
                    <legend>Submit a Project</legend>
                    <Form.Group controlId="projectTitle">
                      <Form.Label>Project Title</Form.Label>
                      <Form.Control type="text" name="title" onChange={this.handleChange} value={this.state.title}
                                    placeholder="Enter Project Title" required/>
                      <Form.Text className="text-muted">
                        Project Title should not exceed 100 characters.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="projectDescription">
                      <Form.Label>Project Description</Form.Label>
                      <Form.Control as="textarea" rows="3" name="description" onChange={this.handleChange}
                                    value={this.state.description} placeholder="Enter Project Description" required/>
                      <Form.Text className="text-muted">
                        Explain the project. A brief intro is expected.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="projectThumbnail">
                      <Form.Label>Thumbnail Image Link</Form.Label>
                      <Form.Control type="text" name="image" onChange={this.handleChange} value={this.state.image}
                                    placeholder="Enter Thumbnail Image's Link"/>
                      <Form.Text className="text-muted">
                        Provide the link copied from the address bar in the browser to avoid any errors.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="projectYouTube">
                      <Form.Label>YouTube Demo Link</Form.Label>
                      <Form.Control type="text" name="youtube" onChange={this.handleChange} value={this.state.youtube}
                                    placeholder="Enter Project's YouTube Demo Link"/>
                      <Form.Text className="text-muted">
                        Provide the link copied from the address bar in the browser to avoid any errors.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group controlId="projectGitHub">
                      <Form.Label>GitHub Repository Link</Form.Label>
                      <Form.Control type="text" name="github" onChange={this.handleChange} value={this.state.github}
                                    placeholder="Enter Project's GitHub Repository Link"/>
                      <Form.Text className="text-muted">
                        Provide the link copied from the address bar in the browser to avoid any errors.
                      </Form.Text>
                    </Form.Group>

                    <Button variant="primary" type="submit" style={{
                      backgroundColor: '#34A852',
                      color: '#ffffff',
                      textTransform: "capitalize",
                      borderRadius: 5,
                    }}>
                      Submit
                    </Button>
                  </Form>
                </CardContent>
              </Card>
            </Fade>
          </Modal> : null}

        <Container>
          <Row className="mt-5">
            <Col>
              <h3 style={{color: '#34A852'}}>Projects</h3>
            </Col>
            <Col>
              <Button variant="contained" size='large' className="float-right" style={{
                backgroundColor: '#34A852',
                color: '#ffffff',
                textTransform: "capitalize",
                borderRadius: 5,
              }} onClick={() => {
                console.log("Hello")
                this.clickEvent();
              }}>Submit a Project</Button>
            </Col>
          </Row>

          <Row className="ml-3">
            {this.state.projects.map((project, index) => <Col xs="12" key={index} className="p-0 pr-4 mt-5" md="6"
                                                              lg="4">
              <Card style={{
                boxShadow: `-10px -10px #34A852`,
                borderRadius: 10,
                border: `2px solid #34A852`
              }}>
                <CardActionArea>
                  <ResponsiveEmbed aspectRatio="16by9">
                    <CardMedia image={project.image} component="img" title="Event Image"/>
                  </ResponsiveEmbed>
                  <CardContent>
                    <p className='p-0 m-0' style={{fontSize: 16, fontWeight: "normal",}}>
                      <b>{project.title}</b><br/>
                      <b>Description: </b>{project.description}<br/>
                    </p>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  {project.github ? <Button href={project.github} target="_blank" style={{color: '#000000'}}>
                    <GitHubIcon/>
                  </Button> : null}
                  {project.youtube ? <Button href={project.youtube} target="_blank" style={{color: '#ff0000'}}>
                    <YouTubeIcon/>
                  </Button> : null}
                </CardActions>
              </Card>
            </Col>)}
          </Row>
          <Row className='mb-5'/>
        </Container>
      </Toolbar>
    );
  }
}
