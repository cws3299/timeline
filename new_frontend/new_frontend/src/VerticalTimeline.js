import React from "react";
import ReactDOM from "react-dom";
import { VerticalTimeline, VerticalTimelineElement } from "./Timeline";
import "./Timeline/VerticalTimeline.css";
import "./Timeline/VerticalTimelineElement.css";
import { MdFavorite, MdWbSunny, MdBrightness3 } from "react-icons/md";

function Timeline() {
  return (
    <VerticalTimeline animate={false}>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="5 AM"
        iconStyle={{ background: "#fff", color: "#f22f46" }}
        icon={<MdWbSunny />}
      >
        <h3 className="vertical-timeline-element-title">Wake Up</h3>
        <h4 className="vertical-timeline-element-subtitle"></h4>
        <p>
          The alarm goes off. I
          get up and go workout downstairs. The exercise will do me good. I am
          shivering as I walk downstairs.
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="6 AM"
        iconStyle={{ background: "#fff", color: "#f22f46" }}
        icon={<MdFavorite />}
      >
        <h3 className="vertical-timeline-element-title">Art Director</h3>
        <h4 className="vertical-timeline-element-subtitle">
          San Francisco, CA
        </h4>
        <p>
          Creative Direction, User Experience, Visual Design, SEO, Online
          Marketing
        </p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2008 - 2010"
        iconStyle={{ background: "#fff", color: "#f22f46" }}
        icon={<MdFavorite />}
      >
        <h3 className="vertical-timeline-element-title">Web Designer</h3>
        <h4 className="vertical-timeline-element-subtitle">Los Angeles, CA</h4>
        <p>User Experience, Visual Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--work"
        date="2006 - 2008"
        iconStyle={{ background: "#fff", color: "#f22f46" }}
        icon={<MdFavorite />}
      >
        <h3 className="vertical-timeline-element-title">Web Designer</h3>
        <h4 className="vertical-timeline-element-subtitle">
          San Francisco, CA
        </h4>
        <p>User Experience, Visual Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="April 2013"
        iconStyle={{ background: "#fff", color: "#f22f46" }}
        icon={<MdFavorite />}
      >
        <h3 className="vertical-timeline-element-title">
          Content Marketing for Web, Mobile and Social Media
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Online Course</h4>
        <p>Strategy, Social Media</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="November 2012"
        iconStyle={{ background: "#fff", color: "#f22f46" }}
        icon={<MdFavorite />}
      >
        <h3 className="vertical-timeline-element-title">
          Agile Development Scrum Master
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Certification</h4>
        <p>Creative Direction, User Experience, Visual Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        className="vertical-timeline-element--education"
        date="2002 - 2006"
        iconStyle={{ background: "#fff", color: "#f22f46" }}
        icon={<MdFavorite />}
      >
        <h3 className="vertical-timeline-element-title">
          Bachelor of Science in Interactive Digital Media Visual Imaging
        </h3>
        <h4 className="vertical-timeline-element-subtitle">Bachelor Degree</h4>
        <p>Creative Direction, Visual Design</p>
      </VerticalTimelineElement>
      <VerticalTimelineElement
        iconStyle={{ background: "#fff", color: "#f22f46" }}
        icon={<MdBrightness3 />}
      />
    </VerticalTimeline>
  );
}

module.exports = Timeline;
