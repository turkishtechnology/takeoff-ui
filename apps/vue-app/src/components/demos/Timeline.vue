<template>
  <div class="space-y-8">
    <TkCard>
      <template #header>
        <h2 class="text-2xl font-semibold">Timeline Component Demo</h2>
      </template>
      
      <div class="space-y-8">
        <!-- Basic Timeline -->
        <div>
          <h3 class="text-lg font-medium mb-3">Basic Timeline</h3>
          <TkTimeline :items="basicTimelineItems" />
        </div>

        <!-- Timeline Orientations -->
        <div>
          <h3 class="text-lg font-medium mb-3">Timeline Orientations</h3>
          <div class="space-y-8">
            <div>
              <h4 class="font-medium mb-3">Horizontal Timeline (Default)</h4>
              <TkTimeline 
                :items="orientationItems" 
                orientation="horizontal" 
              />
            </div>

            <div>
              <h4 class="font-medium mb-3">Vertical Timeline</h4>
              <TkTimeline 
                :items="orientationItems" 
                orientation="vertical" 
              />
            </div>
          </div>
        </div>

        <!-- Alternate Timeline -->
        <div>
          <h3 class="text-lg font-medium mb-3">Alternate Timeline</h3>
          <div class="space-y-8">
            <div>
              <h4 class="font-medium mb-3">With Alternating Layout (Default)</h4>
              <TkTimeline 
                :items="alternateItems" 
                :alternate="true" 
                orientation="vertical"
              />
            </div>

            <div>
              <h4 class="font-medium mb-3">Without Alternating Layout</h4>
              <TkTimeline 
                :items="alternateItems" 
                :alternate="false" 
                orientation="vertical"
              />
            </div>
          </div>
        </div>

        <!-- Project Timeline Example -->
        <div>
          <h3 class="text-lg font-medium mb-3">Project Timeline Example</h3>
          <TkTimeline 
            :items="projectTimelineItems" 
            orientation="vertical"
            :alternate="true"
          />
        </div>

        <!-- Company History Timeline -->
        <div>
          <h3 class="text-lg font-medium mb-3">Company History Timeline</h3>
          <TkTimeline 
            :items="companyHistoryItems" 
            orientation="horizontal"
          />
        </div>

        <!-- Process Flow Timeline -->
        <div>
          <h3 class="text-lg font-medium mb-3">Process Flow Timeline</h3>
          <TkTimeline 
            :items="processFlowItems" 
            orientation="vertical"
            :alternate="false"
          />
        </div>

        <!-- Learning Path Timeline -->
        <div>
          <h3 class="text-lg font-medium mb-3">Learning Path Timeline</h3>
          <TkTimeline 
            :items="learningPathItems" 
            orientation="vertical"
            :alternate="true"
          />
        </div>

        <!-- Interactive Timeline Demo -->
        <div>
          <h3 class="text-lg font-medium mb-3">Interactive Timeline Configuration</h3>
          
          <div class="mb-6 space-y-4">
            <div class="flex gap-4 items-center">
              <span class="font-medium">Orientation:</span>
              <TkButton 
                :variant="interactiveOrientation === 'horizontal' ? 'primary' : 'outlined'"
                size="small"
                @click="interactiveOrientation = 'horizontal'"
              >
                Horizontal
              </TkButton>
              <TkButton 
                :variant="interactiveOrientation === 'vertical' ? 'primary' : 'outlined'"
                size="small"
                @click="interactiveOrientation = 'vertical'"
              >
                Vertical
              </TkButton>
            </div>
            
            <div class="flex gap-4 items-center">
              <span class="font-medium">Alternate Layout:</span>
              <TkButton 
                :variant="interactiveAlternate ? 'primary' : 'outlined'"
                size="small"
                @click="interactiveAlternate = !interactiveAlternate"
              >
                {{ interactiveAlternate ? 'Enabled' : 'Disabled' }}
              </TkButton>
            </div>

            <div class="flex gap-4 items-center">
              <span class="font-medium">Timeline Type:</span>
              <TkButton 
                :variant="selectedTimelineType === 'development' ? 'primary' : 'outlined'"
                size="small"
                @click="selectedTimelineType = 'development'"
              >
                Development
              </TkButton>
              <TkButton 
                :variant="selectedTimelineType === 'career' ? 'primary' : 'outlined'"
                size="small"
                @click="selectedTimelineType = 'career'"
              >
                Career
              </TkButton>
              <TkButton 
                :variant="selectedTimelineType === 'product' ? 'primary' : 'outlined'"
                size="small"
                @click="selectedTimelineType = 'product'"
              >
                Product
              </TkButton>
            </div>
          </div>

          <TkTimeline 
            :items="getInteractiveItems()"
            :orientation="interactiveOrientation"
            :alternate="interactiveAlternate"
          />
        </div>

        <!-- Detailed Timeline with Rich Content -->
        <div>
          <h3 class="text-lg font-medium mb-3">Detailed Timeline with Rich Content</h3>
          <TkTimeline 
            :items="detailedTimelineItems" 
            orientation="vertical"
            :alternate="true"
          />
        </div>
      </div>
    </TkCard>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TkCard, TkTimeline, TkButton } from '@takeoff-ui/vue';

// Basic timeline items
const basicTimelineItems = ref([
  {
    title: 'Project Started',
    description: 'Initial planning and requirements gathering phase began.',
    date: '2024-01-15'
  },
  {
    title: 'Design Phase',
    description: 'UI/UX design and wireframes completed.',
    date: '2024-02-01'
  },
  {
    title: 'Development',
    description: 'Frontend and backend development in progress.',
    date: '2024-02-15'
  },
  {
    title: 'Testing',
    description: 'Quality assurance and bug fixing phase.',
    date: '2024-03-01'
  },
  {
    title: 'Deployment',
    description: 'Application deployed to production environment.',
    date: '2024-03-15'
  }
]);

// Orientation items
const orientationItems = ref([
  {
    title: 'Phase 1',
    description: 'Research and Analysis',
    date: 'Q1 2024'
  },
  {
    title: 'Phase 2',
    description: 'Design and Planning',
    date: 'Q2 2024'
  },
  {
    title: 'Phase 3',
    description: 'Implementation',
    date: 'Q3 2024'
  },
  {
    title: 'Phase 4',
    description: 'Launch and Optimization',
    date: 'Q4 2024'
  }
]);

// Alternate items
const alternateItems = ref([
  {
    title: 'Discovery',
    description: 'Market research and user needs analysis to understand the problem space.',
    date: 'Week 1-2'
  },
  {
    title: 'Ideation',
    description: 'Brainstorming sessions and concept development with stakeholders.',
    date: 'Week 3-4'
  },
  {
    title: 'Prototyping',
    description: 'Creating interactive prototypes and gathering initial feedback.',
    date: 'Week 5-6'
  },
  {
    title: 'Validation',
    description: 'User testing and validation of core concepts and workflows.',
    date: 'Week 7-8'
  },
  {
    title: 'Refinement',
    description: 'Iterating based on feedback and finalizing the design.',
    date: 'Week 9-10'
  }
]);

// Project timeline items
const projectTimelineItems = ref([
  {
    title: 'Project Kickoff',
    description: 'Stakeholder meeting, project scope definition, and team assembly. Established project goals and success metrics.',
    date: 'January 5, 2024'
  },
  {
    title: 'Requirements Gathering',
    description: 'Detailed analysis of business requirements, user stories, and technical specifications. Conducted interviews with key stakeholders.',
    date: 'January 12, 2024'
  },
  {
    title: 'Architecture Design',
    description: 'System architecture planning, technology stack selection, and database design. Created technical documentation and API specifications.',
    date: 'January 26, 2024'
  },
  {
    title: 'Sprint 1 - Core Features',
    description: 'Development of core functionality including user authentication, basic CRUD operations, and initial UI components.',
    date: 'February 9, 2024'
  },
  {
    title: 'Sprint 2 - Advanced Features',
    description: 'Implementation of advanced features, integrations with third-party services, and performance optimizations.',
    date: 'February 23, 2024'
  },
  {
    title: 'Beta Release',
    description: 'Limited beta release to selected users for feedback and testing. Bug fixes and performance improvements based on user feedback.',
    date: 'March 8, 2024'
  },
  {
    title: 'Production Launch',
    description: 'Full production deployment with monitoring, documentation, and user onboarding materials. Project successfully delivered.',
    date: 'March 22, 2024'
  }
]);

// Company history items
const companyHistoryItems = ref([
  {
    title: 'Founded',
    description: 'Company established with initial funding',
    date: '2019'
  },
  {
    title: 'Series A',
    description: 'Raised $2M in Series A funding',
    date: '2020'
  },
  {
    title: '100 Customers',
    description: 'Reached first 100 customers milestone',
    date: '2021'
  },
  {
    title: 'International Expansion',
    description: 'Expanded operations to European markets',
    date: '2022'
  },
  {
    title: 'IPO',
    description: 'Went public with successful IPO',
    date: '2023'
  },
  {
    title: 'Innovation Award',
    description: 'Received industry innovation award',
    date: '2024'
  }
]);

// Process flow items
const processFlowItems = ref([
  {
    title: 'Application Submitted',
    description: 'User submits application with required documents',
    date: 'Step 1'
  },
  {
    title: 'Initial Review',
    description: 'Application reviewed for completeness and basic requirements',
    date: 'Step 2'
  },
  {
    title: 'Background Check',
    description: 'Comprehensive background verification process',
    date: 'Step 3'
  },
  {
    title: 'Interview Process',
    description: 'Multiple interview rounds with different team members',
    date: 'Step 4'
  },
  {
    title: 'Decision Making',
    description: 'Final evaluation and decision by hiring committee',
    date: 'Step 5'
  },
  {
    title: 'Offer Extended',
    description: 'Job offer sent to selected candidate with terms',
    date: 'Step 6'
  }
]);

// Learning path items
const learningPathItems = ref([
  {
    title: 'HTML & CSS Basics',
    description: 'Learn fundamental web technologies: HTML structure, CSS styling, and responsive design principles.',
    date: 'Month 1'
  },
  {
    title: 'JavaScript Fundamentals',
    description: 'Master JavaScript basics: variables, functions, objects, arrays, and DOM manipulation.',
    date: 'Month 2'
  },
  {
    title: 'Frontend Framework',
    description: 'Dive into Vue.js or React: components, state management, and modern development practices.',
    date: 'Month 3-4'
  },
  {
    title: 'Backend Development',
    description: 'Learn server-side development: Node.js, databases, APIs, and authentication.',
    date: 'Month 5-6'
  },
  {
    title: 'Full-Stack Project',
    description: 'Build a complete application combining frontend and backend skills with deployment.',
    date: 'Month 7-8'
  }
]);

// Interactive timeline state
const interactiveOrientation = ref('vertical');
const interactiveAlternate = ref(true);
const selectedTimelineType = ref('development');

// Interactive timeline data
const interactiveTimelineData = {
  development: [
    {
      title: 'Planning',
      description: 'Project planning and requirements analysis',
      date: 'Week 1'
    },
    {
      title: 'Development',
      description: 'Core feature development and implementation',
      date: 'Week 2-4'
    },
    {
      title: 'Testing',
      description: 'Quality assurance and bug fixing',
      date: 'Week 5'
    },
    {
      title: 'Deployment',
      description: 'Production deployment and monitoring',
      date: 'Week 6'
    }
  ],
  career: [
    {
      title: 'Junior Developer',
      description: 'Started career in software development',
      date: '2019'
    },
    {
      title: 'Mid-level Developer',
      description: 'Promoted with increased responsibilities',
      date: '2021'
    },
    {
      title: 'Senior Developer',
      description: 'Leading projects and mentoring juniors',
      date: '2023'
    },
    {
      title: 'Tech Lead',
      description: 'Technical leadership and architecture decisions',
      date: '2024'
    }
  ],
  product: [
    {
      title: 'MVP Launch',
      description: 'Minimum viable product released to market',
      date: 'Q1'
    },
    {
      title: 'Feature Updates',
      description: 'Major feature additions based on user feedback',
      date: 'Q2'
    },
    {
      title: 'Scale Up',
      description: 'Infrastructure scaling for increased user base',
      date: 'Q3'
    },
    {
      title: 'Market Expansion',
      description: 'Expansion to new markets and demographics',
      date: 'Q4'
    }
  ]
};

// Detailed timeline items
const detailedTimelineItems = ref([
  {
    title: 'Initial Concept Development',
    description: 'The journey began with extensive market research and customer interviews to identify pain points in the current market. We conducted over 50 user interviews and analyzed competitor solutions to validate our initial hypothesis.',
    date: 'January 2024'
  },
  {
    title: 'Technical Proof of Concept',
    description: 'Developed a working prototype to demonstrate core functionality. The POC included basic user authentication, data processing algorithms, and a minimal user interface. This phase helped validate technical feasibility and identify potential challenges.',
    date: 'February 2024'
  },
  {
    title: 'Funding and Team Building',
    description: 'Secured initial seed funding of $500K and expanded the team from 3 to 8 members. Hired key positions including senior developers, UX designer, and product manager. Established development processes and project management workflows.',
    date: 'March 2024'
  },
  {
    title: 'Alpha Version Development',
    description: 'Built the first complete version with all core features. Implemented user management, data analytics, reporting system, and API integrations. Conducted extensive internal testing and refined the user experience based on team feedback.',
    date: 'April-May 2024'
  },
  {
    title: 'Beta Testing Program',
    description: 'Launched closed beta with 50 selected customers. Gathered comprehensive feedback on usability, performance, and feature gaps. Made significant improvements to the user interface and added requested features. Achieved 85% user satisfaction rate.',
    date: 'June 2024'
  },
  {
    title: 'Production Launch',
    description: 'Successfully launched to the public with full marketing campaign. Achieved 1,000 sign-ups in the first week and maintained 99.9% uptime. Implemented customer support systems and monitoring tools. Featured in major tech publications.',
    date: 'July 2024'
  }
]);

// Methods
const getInteractiveItems = () => {
  return interactiveTimelineData[selectedTimelineType.value] || [];
};
</script>
