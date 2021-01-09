import React from "react";
import { Input, InputGroup, InputGroupAddon, Button, Container, Row, Col } from "reactstrap";
import { useIntl } from "react-intl";
import { NavLink } from "react-router-dom";

import Layout from "../components/layout/layout";
import Tweet from "../components/common/Tweet";
import Project from "../components/common/Project";
import { TWEETS } from "../fixtures/home";
import { homeMessages, titleMessages } from "../locales/messages";

import developer from "../assets/img/developer.svg";
import search from "../assets/icons/search.svg";
import { useQuery } from "react-query";
import { searchProject } from "../services/projects";

const HomePage = () => {
  const NB_TOP_PROJECTS = 6;
  const TOP_PROJECTS_PAGE = 1;
  const TOP_PROJECTS_SORT = "popularity";

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { data: projects_data, error, isLoading } = useQuery(
    ["projects", { page: TOP_PROJECTS_PAGE, count: NB_TOP_PROJECTS, sortMethod: TOP_PROJECTS_SORT }],
    searchProject,
  );

  const { formatMessage } = useIntl();

  return (
    <Layout title={formatMessage(titleMessages.home)}>
      <div className="home-page">
        <section id="banner">
          <Container>
            <Row>
              <Col md="6">
                <h1>{formatMessage(homeMessages.mainTitle)}</h1>
                <p className="main-text">
                  <NavLink to="/projects">
                    <span className="navbar-brand cursor-pointer btn btn-outline-primary btn-sm">{formatMessage(homeMessages.btnToProject)}</span>
                  </NavLink>
                </p>
              </Col>
              <Col className="text-right" md="6">
                <img alt="developer illustration" className="d-none d-md-block" src={developer} style={{ marginTop: "30px" }} />
              </Col>
            </Row>
          </Container>
        </section>

        <section className="item-center" id="search">
          <div className="text-center">
            <h2>{formatMessage(homeMessages.searchTitle)}</h2>
            <form className="search-form">
              <div>
                <InputGroup>
                  <Input className="search-input" placeholder="ex: Full Stack Web Developer" />
                  <InputGroupAddon addonType="append">
                    <Button className="search-button">
                      <img alt="search button" src={search} />
                    </Button>
                  </InputGroupAddon>
                </InputGroup>
              </div>
            </form>
            {/*
            <a href="#">
              <img alt="circle down arrow" src="/static/icons/circle-down-arrow.svg" /> <br />
              {t('home:btnAdvancedSearch')}
            </a>
            */}
          </div>
        </section>

        <section className="item-center" id="projects">
          <div className="text-center">
            <h2> {formatMessage(homeMessages.topProjectTitle)} </h2>
            <Container>
              <Row style={{ margin: "40px 0 40px 0" }}>
                {projects_data?.result.hits.map((project, i) => (
                  <Col key={i} md="4" style={{ margin: "20px 0 20px 0" }}>
                    <Project
                      description={project.description}
                      language={project.language}
                      link={project.html_url}
                      name={project.name}
                      stars={project.stargazers_count}
                      type="small"
                    />
                  </Col>
                ))}
              </Row>
            </Container>
            <NavLink to="/projects">
              <Button color="primary">{formatMessage(homeMessages.btnViewMoreProject)}</Button>
            </NavLink>
          </div>
        </section>

        <section className="item-center" id="tweets">
          <div className="text-center">
            <h2> {formatMessage(homeMessages.topTweetTitle)} </h2>
            <Container>
              <Row style={{ margin: "40px 0 40px 0" }}>
                {TWEETS.map((tweet, i) => (
                  <Col key={i} md="4" style={{ margin: "20px 0 20px 0" }}>
                    <Tweet
                      avatar={tweet.avatar}
                      comments={tweet.comments}
                      likes={tweet.likes}
                      name={tweet.name}
                      retweets={tweet.retweets}
                      text={tweet.text}
                      username={tweet.username}
                    />
                  </Col>
                ))}
              </Row>
            </Container>
            <Button color="primary"> {formatMessage(homeMessages.btnViewMoreTweet)} </Button>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
