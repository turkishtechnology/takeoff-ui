import { TkButton } from '@takeoff-ui/react';

export default function ReleaseNavigate() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center">
      <h1>Version 0.1.0 and later release notes are available on GitHub!</h1>
      <a href="https://github.com/turkishtechnology/takeoff-ui/releases" target="_blank" rel="noopener noreferrer">
        <TkButton
          label="View on GitHub"
          variant="primary"
          size="large"
          style={{
            animation: 'bounce 0.6s ease-in-out infinite',
            animationDelay: '1s',
          }}
        />
      </a>
      <style
        dangerouslySetInnerHTML={{
          __html: `
          @keyframes bounce {
            0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
            40% { transform: translateY(-10px); }
            60% { transform: translateY(-5px); }
          }
        `,
        }}
      />
    </div>
  );
}
