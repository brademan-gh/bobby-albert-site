// The ON&IN Leadership Assessment — Bobby Albert, 2018.
//
// Recovered 2026-09-28 from two sources in 'VDC Backup from Matt Simpson':
//   * the questions, from the archived Gravity Form at oninassessment.bobbyalbert.com
//   * this feedback, from Bobby's own report-wording document (v1.0, 2018-11-23)
//
// The original emailed these results after collecting an address. This version shows
// them instantly, and — importantly — every block below is rendered into the page's
// HTML so it is indexable. That is the whole point: the original was invisible to
// search engines. Do not switch this to client-side injection.
//
// Offers of downloadable 'printable quote pages' were removed: they pointed at
// Leadpages URLs that now 404. The quotes themselves are kept inline.

export interface Side { lead: string; affirm: string; challenge: string; steps: string[]; }
export interface Question { n: number; q: string; a: string; b: string; A: Side; B: Side; }

export const INTRO: string[] = [
	'Thank you for taking our ON&IN Leadership Assessment! This assessment has helped hundreds of leaders shift their thinking and learn to work ON their business as they work IN their business.',
	'You’ll find your results, and our associated guidance, below. But first, let me make a few comments.',
	'There are no right and wrong answers!',
	'Some people answer some questions with a leader mindset (those who tend to work ON their business), and some questions with management mindset (those who tend to work IN their business). While others answer every question from a leader’s perspective, and finally others answer every question from a manager’s perspective.',
	'If you answer more questions with the mindset of a leader, then you have natural talent in the area of leadership.',
	'If you answer more questions with the mindset of a manager, then you have a natural talent in the area of management.',
	'Some who answer three or four questions like a manager and three or four questions like a leader conclude that they are a “balanced” leader. In fact, nothing could be farther from the truth.',
	'For every question, you will, indeed, have a leaning that reflects your natural strength in that particular area. Your challenge is to address, learn about, and embrace the other side of that question. So, if you answer a question with a leader’s mindset, you’ll want to focus on how to develop the associated manager’s mindset around that same question and topic.',
	'Healthy organizations need leaders who work ON their business while they work IN their business.',
	'Don’t worry, our tailored feedback will affirm your natural leanings, while challenging and equipping you to dig into the complimentary side of each question or topic.',
	'Now, let’s dig into your results…',
];

export const QUESTIONS: Question[] = [
	{
		n: 1,
		q: 'What would you rather do?',
		a: 'Analyze the details of today’s tasks.',
		b: 'Dream about your vision for the future.',
		A: {
			lead: 'Your answer to this question reflects the mindset of a manager, someone working IN their business.',
			affirm: 'I applaud your attention to details, analysis and getting things done! John Wooden, perhaps the best basketball coach of all time stated, “It’s the little details that are vital. Little things make big things happen.”',
			challenge: 'Could I challenge you with something? Will you occasionally remove yourself from the daily details of your work and think about the future? When you do, you are working ON your business.',
			steps: [
				'Consider scheduling a time to dream about the future, say after lunch on Fridays. Here are some helpful questions to stimulate your thinking about the future:',
				'Where do I want to be by the end of this year? Geographically Financially Relationally',
				'Where do I want to be in 10 years? If I continue to think and do the things I am currently doing, will I be able to achieve my 10-year vision for myself?',
				'Foster the practice of dreaming big about your future. Print and post this quote from Eleanor Roosevelt: “The future belongs to those who believe in the beauty of their dreams.”',
			],
		},
		B: {
			lead: 'Your answer to this question reflects the mindset of a leader, someone working ON their business.',
			affirm: 'I applaud your bent toward envisioning the future, your courage to dream, and the ease at which you ask yourself, and others, “What if…?”.',
			challenge: 'Could I challenge you with something? Will you tie your daily tasks to your clearly envisioned future? Realize that the more mundane duties of today are the stepping stones that lead to your highly motivating future! This process will highlight the importance of working IN your business.',
			steps: [
				'Make a list of your top three tasks to accomplish today on a piece of paper. Then prioritize the three items and put a star by the top priority item. Finally, commit to doing the first item before anything else that day, and the final two before the end of the day.',
				'Ask yourself, “What tasks must be done today to pave the way toward the bright future that I envision for tomorrow?”',
				'Print and post the following quote from John Wooden in a prominent place: “It’s the little details that are vital. Little things make big things happen.”',
			],
		},
	},
	{
		n: 2,
		q: 'How are you more likely to spend your time?',
		a: 'Optimizing current systems and processes.',
		b: 'Looking for new opportunities.',
		A: {
			lead: 'Your answer to this question reflects the mindset of someone working IN their business.',
			affirm: 'I commend your desire to optimize and increase the efficiency of existing systems and processes within your organization. There is usually waste (in the form of time, energy and money) hiding behind every process explained by the phrase “That’s the way we have always done it.” And it takes people like you to challenge those assumptions and make the necessary improvements.',
			challenge: 'Could I challenge you with the thought that sometimes, a new opportunity holds more promise for growth than expending great effort to optimize an old system or process? When you take the time to explore new opportunities, you’re working ON your business.',
			steps: [
				'Consider gathering a group of folks from your workplace together to brainstorm and consider new opportunities. Such opportunities might be new product or service lines, or perhaps new ways to provide the goods and services that you already deliver to your customer.',
				'Schedule time (weekly) to catch up on trade journals in your industry. Even general business publications (e.g., The Wall Street Journal) can help you broaden your exposure to new technology and approaches to business.',
			],
		},
		B: {
			lead: 'Your answer to this question reflects the mindset of someone working ON their business.',
			affirm: 'I commend your propensity to seek out new opportunities. Your forward thinking and openness to new ideas will help secure your success and increase your competitiveness in your industry.',
			challenge: 'Could I challenge you with the concept of getting “your house in order” before overreaching into new and unproven areas? Working IN your business first helps you maximize the growth and impact of your current offerings before branching out into new opportunities.',
			steps: [
				'Ask one of your more manager-minded team members to provide monthly reports of certain status or metrics that clearly reflect the health of your business. This will prompt you to regularly track results and ask, “How can we do better?”',
				'Consider spending time learning the overall job functions of a particular part of the business. Ask people, “What is the biggest obstacle holding you back?”',
				'Additional resource: <a href="/blog/how-business-reviews-can-help-leaders-achieve-better-results/">How Business Reviews Can Help Leaders Achieve Better Results</a>',
			],
		},
	},
	{
		n: 3,
		q: 'What are you more focused on?',
		a: 'Accomplishing a specific assignment.',
		b: 'Establishing and building relationships.',
		A: {
			lead: 'Your answer to this question reflects the mindset of someone who prefers to work IN their business.',
			affirm: 'You are a person who focuses on the task at hand and works hard at it until it is completed. If someone absolutely needs to get ‘r done, I bet you’re the person they turn to! Success is built with the bricks of completed assignments.',
			challenge: 'You might need to remind yourself that your hard work does not exist in a vacuum. Ultimately, your labor is done with and for other people. Ignoring the importance of relationships will limit your overall effectiveness as a team member. Take time to work ON your business in this way will engage your team and positively impact your results.',
			steps: [
				'Take some time to ask for advice or input from those around you. Including others in your efforts can transform your “I” mentality into the more powerful perspective of “we”.',
				'Eat lunch with at least one coworker every week. The informal time together can lead to greater trust, better understanding, and a more cohesive team.',
				'Print out and post the following quote from Michael Jordan, “Talent wins games, but teamwork and intelligence wins championships.”',
			],
		},
		B: {
			lead: 'Your answer to this question reflects the mindset of someone who prefers to work ON their business.',
			affirm: 'You are a person who values relationships with others. Consequently, you have a desire to strengthen those relationships over time. The relationship seeds that you so naturally plant will inevitably produce a great harvest of friendship, understanding, and trust.',
			challenge: 'Have you considered when you complete your specific assignments, you are in fact, building stronger relationships with those who depend on you to do your job. Those who focus only on relationships and ignore their specific responsibilities will, in time, go broke! Take time to work IN your business by accomplishing the specific tasks assigned to you.',
			steps: [
				'Remember the wisdom of perhaps the best basketball coach in history. John Wooden stated, “It’s the little details that are vital.”',
				'Ask a co-worker to hold you accountable for getting an important task done. It will motivate you to do the work and build a stronger relationship as you display humility and trust by reaching out for help.',
			],
		},
	},
	{
		n: 4,
		q: 'How do you more frequently act?',
		a: 'Reactively respond to changes as they occur.',
		b: 'Proactively look for and study changing trends.',
		A: {
			lead: 'Your answer to this question reflects the mindset of a manager, someone who is working IN the business.',
			affirm: 'Responding quickly to changes in the workplace or marketplace is one of your clear strengths. One thing we can depend on is that things will, indeed, change! Your ability to be flexible and nimble will allow you to adapt to new opportunities and challenges.',
			challenge: 'Try changing your approach – from reactive to more proactive. Look for trends and signs of impending change so you can take action before the situation becomes critical. By periodically disengaging from the detailed tasks of today, you can assess the bigger picture and develop a plan. This proactive approach positions you to work ON the business.',
			steps: [
				'Set aside time each week to read trade journals that are specific to your industry.',
				'Identify, subscribe to, and read the blogs or newsletters of a couple of thought leaders that operate in your industry or market.',
			],
		},
		B: {
			lead: 'Your answer to this question reflects the mindset of a leader, someone who is working ON the business.',
			affirm: 'Your inclination to look for emerging trends is a definite strength. No doubt, you use this proactive mindset in your industry, your community, and your social circles. This trait allows you to have a remarkable foresight into coming changes and trends in your business and life.',
			challenge: 'Routinely shorten your gaze and narrow your focus to the changes impacting your own organization and people. If we only scan the horizon for threats and opportunities, we can miss the shifting sands beneath our feet. Work IN your business by noticing “trends” that show up within your own organization.',
			steps: [
				'Devote time, this week, to assess the changes that might be impacting your business right now. Then take steps to address those changes promptly.',
				'Often the coming trends can be seen in our own organizations today. Ask your front line people about any changes in customer satisfaction or unique requests coming from your sales team. Frequently, a pattern will emerge that sheds light on a future shift in the marketplace.',
			],
		},
	},
	{
		n: 5,
		q: 'Which do you prefer?',
		a: 'The safety of a calm harbor.',
		b: 'High-risk, sometimes unpredictable situations.',
		A: {
			lead: 'Your answer to this question reflects the mindset of someone who likes to work IN their business.',
			affirm: 'Kudos for valuing safety! Averting risks is prudent and is considered good management. Extreme risks endanger people, profits and ultimately the very survival of an organization. Respecting risks allows us to manage them appropriately.',
			challenge: 'Work ON your business and take some calculated risks. Have you considered that trying to avoid all risks creates one of the greatest risks of all – being mired in the status quo, unable to adapt to the inevitable changes that occur in today’s marketplace?',
			steps: [
				'Recognize that your affinity for the calm harbor is part of human nature, but it also limits the scope and scale of your achievement. Robin S. Sharma reflected this in his statement, “People fear leaving their safe harbor of the known and venturing off into the unknown. Human beings crave certainty – even when it limits them.”',
				'Ask yourself, “What is the likely outcome of this new opportunity?” And follow with the question, “What is are the risks of not attempting this new endeavor?”',
				'Print and post this quote by Mark Twain, “Twenty years from now you will be more disappointed by the things you didn\'t do than by the ones you did do. So, throw off the bowlines. Sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.”',
			],
		},
		B: {
			lead: 'Your answer to this question reflects the mindset of a someone who likes to work ON their business.',
			affirm: 'Kudos for embracing your adventurous spirit! It’s natural for you to cast off your anchor and sail toward the open sea, seeking a better and brighter tomorrow. Such a spirit is often the uniting power that flows from a leader to their people. An infectious personality and perspective fuel the hopes of the entire team.',
			challenge: 'Temper your desire for the new and unknown with a healthy focus on tending to the proven products and services of today. Take time to work IN your business. Securing the ropes and sails of your established fleet allows you to launch adventures into the unknown with confidence.',
			steps: [
				'Count the costs of a new idea or venture. Do you have the capacity in your organization to undertake this new opportunity? Do you need to make a key hire, or perhaps resolve lingering legal or regulatory questions before moving forward?',
				'Ask yourself, “What is the opportunity cost of pursuing the unproven opportunities of tomorrow versus leveraging the proven approaches of today.”',
				'Stoke your desire to do things well by printing and prominently posting this quote from John W. Garner, “Excellence is doing ordinary things extraordinarily well.”',
			],
		},
	},
	{
		n: 6,
		q: 'When you make decisions, which do you depend on more?',
		a: 'Facts and figures.',
		b: 'What your instinct or gut tells you.',
		A: {
			lead: 'Your answer to this question reflects the mindset of someone who prefers to work IN their business.',
			affirm: 'Celebrate your attention to facts and figures, the nuts and bolts of business! The numbers, when viewed clearly and without bias, reveal the results of the leadership and efforts of the organization. Folks like you, who set feelings aside and view the reality revealed in the numbers, are critical for any endeavor to succeed for the long haul.',
			challenge: 'Work to develop a sixth sense of listening to your “gut”. This approach can boost your effectiveness, especially when coupled with your respect for the facts.',
			steps: [
				'Pause when considering new challenges or opportunities and ask yourself, “Does this pass the ‘smell test’?”. When you consider all of your options, does one just seem better than the others? Post the following quote by Albert Einstein in your work area, "The intuitive mind is a sacred gift and the rational mind is a faithful servant. We have created a society that honors the servant and has forgotten the gift."',
				'Cultivate your intuition, so that it may guide you to where and how you can best direct your attention toward detail. Scientist Jonas Salk remarked, “Intuition will tell the thinking mind where to look next.”',
				'For your next big decision, try jotting down what your gut tells you early in the decision-making process. Then proceed through your normal decision process and see if you reach the same conclusion.',
			],
		},
		B: {
			lead: 'Your answer to this question reflects the mindset of someone who prefers to work ON their business.',
			affirm: 'Celebrate your ability to hone and use your intuition to make better decisions. Making decisions informed by a refined intuition allows a leader to stay one step ahead of the competition – and it reduces the number of missteps you make. Take heart that you have embraced the gift of intuition of which Albert Einstein refers, "The intuitive mind is a sacred gift and the rational mind is a faithful servant. We have created a society that honors the servant and has forgotten the gift."',
			challenge: 'Purpose to consider the facts and figures associated with the next decision that you make, before relying on your intuition. If your gut is leading you toward the best solution, it will be supported by your analysis of the corresponding facts and figures.',
			steps: [
				'Verify what your intuition is telling you by looking at the hard numbers associated with your preferred choice. If the facts and figures don’t support your inclination to go a certain direction, consider this a red flag of warning. Treat this as an invitation to revisit your options and reconsider what your gut is telling you.',
				'Ask others who are strong in facts and figures to help you evaluate the decision. When you tap their bent toward analysis, you’ll improve your likelihood of success.',
				'Print and post this quote by Benjamin Disraeli, “To be conscious that you are ignorant of the facts is a great step to knowledge.”',
			],
		},
	},
	{
		n: 7,
		q: 'What do you enjoy?',
		a: 'Preserving the current processes and procedures.',
		b: 'Innovating and creating new products or services.',
		A: {
			lead: 'Your answer to this question reflects the mindset of a manager, someone who likes to work IN their business.',
			affirm: 'I applaud your natural talent to “tend the shop”. You do well to nurture and support the tried and true processes that have led to your current success. Your focus on preserving and faithfully implementing current procedures helps standardize operations and output.',
			challenge: 'Your current, refined systems form a stable foundation from which new products and services can launch. What innovation would take your organization to a higher level of success? Choose to work ON your business by promoting innovation and creativity within your organization.',
			steps: [
				'Ask yourself, “How can we do it better?” To remember this perspective, print and post the following quote by Thomas Edison in a prominent place, “There’s a way to do it better–find it.”',
				'Reaching for innovation will improve your leadership. Perhaps Steve Jobs said it best when he stated, “Innovation distinguishes between a leader and a follower.”',
				'Take time to think outside of the box defined by current products and practices. I challenge you to adopt an abundance mindset. The abundance mindset asks, “How can I?” while the scarcity mindset asks, “Can I? to discover <a href="/blog/3-traits-reflect-abundance-mindset/">three important traits that reflect an abundance mindset</a>!',
			],
		},
		B: {
			lead: 'Your answer to this question reflects the mindset of a leader, someone who likes to work ON their business.',
			affirm: 'I applaud your natural talent to innovate and create new product and service lines for your organization. Steve Jobs recognized your leadership when he said, “Innovation distinguishes between a leader and a follower.”',
			challenge: 'Guide and protect your innovation by securing the condition and efficiency of current policies and systems. Current practices, once shored up and high functioning, will serve as a stable platform from which your future innovation can grow! Choose to work IN your business by reviewing current practices and procedures to maximize the ROI of your existing business.',
			steps: [
				'Create a plan to assess the efficiency of current processes and procedures in your area or entire organization. Are current practices producing the desired outcomes? How can they be improved?',
				'Learn a new perspective from Helen Keller, who said, “I long to accomplish a great and noble task, but it is my chief duty to accomplish small tasks as if they were great and noble.”',
			],
		},
	},
];
