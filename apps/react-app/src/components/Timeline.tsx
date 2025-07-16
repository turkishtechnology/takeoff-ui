import { TkButton, TkTimeline, TkTimelineItem } from '@takeoff-ui/react';

function Timeline() {
  const items = [
    { title: 'First Commit', date: '07.07.2024' },
    { title: 'Prod', date: '16.12.2024', description: 'Live release' },
    {
      title: 'Open Source',
      date: '12.04.2025',
      description: 'Open source release',
    },
  ];
  return (
    <div>
      <TkTimeline items={items} />

      <TkTimeline items={items} />
      <TkTimeline items={items} orientation="vertical" />

      <TkTimeline items={items} />
      <TkTimeline items={items} alternate={false} />

      <TkTimeline orientation="vertical" className="my-4">
        <TkTimelineItem>
          <div className="custom-content">
            <h3>Custom Title</h3>
            <p>
              Custom description with <strong>HTML</strong>
            </p>
            <img
              src="https://flagpedia.net/data/flags/h24/tr.webp"
              alt="Custom image"
            />
          </div>
        </TkTimelineItem>

        <TkTimelineItem>
          <div className="another-custom-content">
            <span className="badge">Important</span>
            <p className="text-red-100">Another custom timeline item</p>
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
}

export default Timeline;
