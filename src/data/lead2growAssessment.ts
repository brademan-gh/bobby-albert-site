// The Lead2Grow Assessment — Bobby Albert, 2017.
//
// GENERATED from Bobby's own files in 'Dropbox/Bobby Albert/Lead2Grow Assessment/':
//   * questions: 'Questions for Lead2Grow Assessment v1.2.docx' (2017-08-04)
//   * feedback and scoring: 'Lead2Grow Scoring Matrix v4 w links.xlsx' (2017-08-04)
// See claude/lead2grow-assessment-findings-2026-10-05.md in the project notes.
//
// This is NOT the ON&IN assessment. It is a separate instrument: eight questions about
// the organisation, grouped into four sections, each section getting one of three
// feedback paragraphs.
//
// SCORING (Bobby's): each answer is a = 0, b = 15, c = 33. A section's answers are summed
// and the sum picks the band. Per Bobby's instructions the score itself is never shown.
// The v4 bands for three-question sections were 0–30 / 33–45 / 63+, which left a sum of
// 48 (one a, one b, one c) in no band. Brady decided 2026-10-05: mid = 33–48.
//
// Editorial changes: the "<here>" / "<this blog post>" placeholders became links to the
// posts the matrix named (all four are on this site); one typo fixed ("You can a read") and one capital made consistent ("Growth Indicators").

export type Band = 'low' | 'mid' | 'high';
export const POINTS = [0, 15, 33] as const;

/** Bobby's bands, with the 2026-10-05 gap fix. */
export function band(sum: number, questions: number): Band {
	if (questions === 1) return sum === 0 ? 'low' : sum === 15 ? 'mid' : 'high';
	return sum <= 30 ? 'low' : sum <= 48 ? 'mid' : 'high';
}

export interface Question { n: number; section: string; q: string; options: [string, string, string]; }
export interface Section { id: string; title: string; covers: string; feedback: Record<Band, string>; }

// From the v1.2 form (instruction line) and the 2017-09-05 revision ("delivered instantly").
export const INSTRUCTIONS = "For each topic below, please select the option that best describes your current situation. There are no right or wrong answers — I urge you to be authentic with your selections. Your personalized results appear instantly, right on this page.";

// From the v1.2 results email — its opening and closing, minus the email-only lines.
export const RESULTS_INTRO = "Please see the following insights gleaned from the answers you provided for the Lead2Grow Assessment. The assessment covers fundamental topics of leadership and organizational growth. I have learned that a leader must address these important areas in order to position their organization for future growth.";
export const RESULTS_CLOSING = "Please consider this feedback as information designed to help you rise to the next level of effectiveness and accomplishment. After years of learning about business and leadership, I’m still discovering new opportunities for personal and business growth.";
export const SIGNOFF = ['To your growth and success,', 'Bobby'];

export const QUESTIONS: Question[] = [
	{ n: 1, section: 'growth', q: "Growth", options: ["The growth of our revenue is below expectations", "The growth of our revenue is in line with expectations", "The growth of our revenue far exceeds our expectations"] },
	{ n: 2, section: 'growth', q: "Customer Retention", options: ["It seems like we are always trying to replace customers that we’ve lost with new first-time customers", "We experience what could be characterized as industry-average customer churn rates", "It is rare that we lose a customer – with most of our customers being repeat and long term"] },
	{ n: 3, section: 'growth', q: "Employee Turnover – I believe that:", options: ["Our employee turnover is higher than the average in our industry (i.e. worse than industry average)", "Our employee turnover is in line with the average of our industry", "Our employee turnover is lower than the average in our industry (i.e. better than industry average)"] },
	{ n: 4, section: 'beliefs', q: "Which best describes your purpose?", options: ["We have not identified the purpose of our organization", "We have a written purpose statement", "Everyone in our organization knows our purpose statement"] },
	{ n: 5, section: 'beliefs', q: "Vision", options: ["I have not identified a clear vision for our organization", "We have a written vision statement", "Everyone in our organization knows our vision statement"] },
	{ n: 6, section: 'beliefs', q: "Core Values", options: ["I have not identified our core values", "Our core values are identified in writing", "Everyone in my organization knows and lives out our core values"] },
	{ n: 7, section: 'engagement', q: "Employee Satisfaction", options: ["I know enough to suspect that many of my employees may not like working here", "I do not hear complaints from my employees so I assume they are satisfied", "We have conducted a confidential survey of our employees to learn what they like about working here and where we may fall short of their expectations"] },
	{ n: 8, section: 'forward', q: "Strategic Plan", options: ["We have not developed a strategic plan", "We have a written strategic plan", "We are implementing our comprehensive strategic plan and measure our progress against it"] },
];

export const SECTIONS: Section[] = [
	{
		id: 'growth',
		title: "Growth Indicators",
		covers: "Revenue growth, customer retention and employee turnover",
		feedback: {
			low: "Your Growth Indicators reflect that you are just starting out, or find it challenging to perform at or above industry norms. Pay particular attention to the guidance from the other sections of the assessment. As you begin to follow this advice, you’ll start to see these measures improve!",
			mid: "Your Growth Indicators reflect that you meet some or all your expectations for growth and industry norms for customer retention and employee turnover! As you follow the guidance from the other sections of the assessment, you’ll see these measures advance toward industry-leading excellence!",
			high: "Your Growth Indicators reflect that you meet and exceed many of the outward measures of organizational growth! At this stage of development, your next challenge is to codify your best-in-class beliefs, practices, and systems to create an enduring organization of excellence!",
		},
	},
	{
		id: 'beliefs',
		title: "Foundational Beliefs",
		covers: "Purpose, vision and core values",
		feedback: {
			low: "Your Foundational Beliefs answers indicate that you could benefit from a closer reflection of your key beliefs. Ask yourself, “What aspects of my purpose, vision and core values need to be defined?” Your answer will identify the foundational beliefs that require your immediate focus. Bestselling author, Jim Collins’ research reveals that establishing your foundational beliefs, or core ideology, is an essential part of becoming a great organization. You can learn more about his findings in <a href=\"/blog/the-power-of-purpose/\">this blog post</a>.",
			mid: "Your Foundational Beliefs answers indicate that you’ve done a good job defining most or all of your key beliefs. Build on that momentum and identify any remaining undefined essential beliefs. Then you can focus on effectively communicating your purpose, vision and core values to your people. Bestselling author, Jim Collins’ research reveals that establishing your foundational beliefs, or core ideology, is an essential part of becoming a great organization. You can learn more about his findings in <a href=\"/blog/the-power-of-purpose/\">this blog post</a>.",
			high: "Your Foundational Beliefs answers indicate you’ve done very well to define and communicate your key beliefs to your people. Great job! Now you can direct your focus on incorporating your purpose, vision and core values into every aspect of your organization. As you’ve already discovered, your foundational beliefs are an essential part of becoming a great organization. You can read about my own results (and Jim Collins’ supporting research) in <a href=\"/blog/the-power-of-purpose/\">this blog post</a>.",
		},
	},
	{
		id: 'engagement',
		title: "Measure of Team Engagement",
		covers: "Employee satisfaction",
		feedback: {
			low: "Your Measure of Team Engagement reflects that you have yet to learn what your people think about your organization. While it is sometimes easy to “put our head in the sand,” we all know that it’s best to ask the hard questions and understand what is happening within our organization. A good place to start discovering what is actually going on with your people is to take a 360-degree evaluation. When I did this, it was a REAL eye-opener! You can read more about my experience <a href=\"/blog/360-degree-evaluation-changed-leadership/\">here</a>.",
			mid: "Your Measure of Team Engagement reflects that you know you have some work to do to improve the level of employee satisfaction in your workplace. One of the better ways to improve in this area is to conduct a confidential employee engagement and satisfaction survey. I have found that the results from such a survey, when correctly administered, can provide a roadmap leading you to better employee engagement – and its related benefits.",
			high: "Your Measure of Team Engagement reflects that you have proactively assessed how your people feel about working in your organization – good job! I have found that once you have reached this level, a leader should focus on addressing the areas of focus revealed in the results of your confidential employee satisfaction survey. I suggest that you put an action plan in place, based on the gaps identified in the survey results.",
		},
	},
	{
		id: 'forward',
		title: "The Way Forward",
		covers: "Strategic plan",
		feedback: {
			low: "Your Strategic Planning feedback reveals that you need to develop a strategic plan for future growth. If you’d like some additional advice to help you get started, I’ve written an article describing three primary steps you can take to clarify your vision. You can access the article by clicking <a href=\"/blog/charted-clear-course-business/\">here</a>.",
			mid: "Your Strategic Planning feedback reveals that you have invested the time to develop a strategic plan for your organization, but you need the motivation or guidance to implement that plan and use it to measure your progress. I’ve written a blog post that can help you take action in three specific ways. You can access the post by clicking <a href=\"/blog/charted-clear-course-business/\">here</a>.",
			high: "Your Strategic Planning feedback reveals that you have developed a strategic plan and are actively using it as a guide to future development and growth! As you go forward, it’s important to identify any gaps between actual results and your plan and determine whether to adjust your plan or alter your tactical activities to achieve alignment. Through the years, I have used several questions to clarify my vision for the future and keep me (and my company) on the path toward greater growth and success. You might enjoy a blog post on asking profound questions, which includes a link to download my list of 12 Profound Questions to Grow Your Business. You can read the post <a href=\"/blog/you-too-can-ask-profound-questions/\">here</a>.",
		},
	},
];
