import { TkTimeline, TkTimelineItem, TkButton } from '@takeoff-ui/react';
import FeatureDemo from '../../../components/FeatureDemo';
import React from 'react';

const Customization = () => {
  const reactCode = `
  <TkTimeline orientation="vertical">
    <TkTimelineItem>
      <div className="custom-content">
        <h3 className="text-black-700">Custom Title</h3>
        <p>
          Custom description with <strong>HTML</strong>
        </p>
        <img
          src="https://flagpedia.net/data/flags/h24/tr.webp"
          alt="Custom image"
        />
      </div>
    </TkTimelineItem> 
  <TkTimeline />`;

  const vueCode = `
  <TkTimeline>
    <TkTimelineItem>
      <div class="custom-content">
        <h3 class="text-black-700">Custom Title</h3>
        <p>
          Custom description with <strong>HTML</strong>
        </p>
        <img
          src="https://flagpedia.net/data/flags/h24/tr.webp"
          alt="Custom image"
        />
      </div>
    </TkTimelineItem>
  </TkTimeline>
  `;

  const angularCode = `
  <tk-timeline>
    <tk-timeline-item>
      <div class="custom-content">
        <h3 class="text-black-700">Custom Title</h3>
        <p>
          Custom description with <strong>HTML</strong>
        </p>
        <img
          src="https://flagpedia.net/data/flags/h24/tr.webp"
          alt="Custom image"
        />
      </div>
    </tk-timeline-item>
  </tk-timeline>
  `;

  const demo = (
    <div className=" my-6">
      <TkTimeline orientation="vertical" alternate={true}>
        <TkTimelineItem>
          <div className="custom-content">
            <h3>Custom Title</h3>
            <div className="flex gap-2 items-center">
              <img src="https://flagpedia.net/data/flags/h24/tr.webp" alt="Custom image" />
              <span>
                Custom description with <strong>HTML</strong> and <strong>Image</strong>.
              </span>
            </div>
          </div>
        </TkTimelineItem>

        <TkTimelineItem>
          <div className="another-custom-content">
            <span className="text-black-700">Important</span>
            <p className="text-red-500">Another custom timeline item</p>
            <iframe
              width="300"
              height="250"
              src="https://www.youtube.com/embed/LTOSVKGiW18?si=4u6rXsSpxHxjIFj7"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerpolicy="strict-origin-when-cross-origin"
              allowfullscreen
            ></iframe>
          </div>
        </TkTimelineItem>
        <TkTimelineItem>
          <div className="yet-another-custom-content">
            <h4>Yet Another Item</h4>
            <p>This is yet another custom timeline item with more content.</p>
            <TkButton label="Cancel" variant="secondary" type="filled" />
          </div>
        </TkTimelineItem>
        <TkTimelineItem>
          <div className="final-custom-content">
            <h5>Final Item</h5>
            <p>This is the final custom timeline item.</p>
            <TkButton label="Finish" variant="primary" type="filled" />
          </div>
        </TkTimelineItem>
      </TkTimeline>
    </div>
  );

  return <FeatureDemo demo={demo} reactCode={reactCode} vueCode={vueCode} angularCode={angularCode}></FeatureDemo>;
};

export default Customization;
