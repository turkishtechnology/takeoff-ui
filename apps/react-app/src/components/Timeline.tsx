import { TkTimeline } from '@takeoff-ui/react';

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
    </div>
  );
}

export default Timeline;
