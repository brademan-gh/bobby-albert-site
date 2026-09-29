// The twelve browse topics, in the order they appear on /blog.
//
// Order is by post count, largest first — deliberately, so the hub leads with the
// argument Bobby made most often rather than with whatever sorts alphabetically.
//
// `id` is the URL slug: /topics/<id>/. Changing an id changes a live URL, so if
// one ever has to change, add a redirect for the old path at the same time.
//
// Source: claude/topic-taxonomy-from-reading-2026-09-28.md. Sixteen labels came
// out of that analysis; the thin ones are merged here into twelve, exactly as it
// recommended. The seventeenth label, NOT-CONTENT, has no topic: those 25 posts
// are excluded from browsing altogether.

export type Topic = {
	id: string;
	name: string;
	/** One sentence, shown on the hub card and as the topic page's meta description. */
	blurb: string;
};

export const TOPICS: Topic[] = [
	{
		id: 'participative-leadership',
		name: 'Participative Leadership',
		blurb:
			'Involving the people who do the work before you decide — the 1-2-3 approach, the Iceberg of Ignorance, and what it costs to decide alone.',
	},
	{
		id: 'culture-and-people-practices',
		name: 'Culture & People Practices',
		blurb:
			'Culture as something you build on purpose, and the hiring, recognition and policy decisions that either build it or quietly undo it.',
	},
	{
		id: 'leading-vs-managing',
		name: 'Leading vs. Managing',
		blurb:
			'You lead people and you manage things. Results and relationships, not results or relationships.',
	},
	{
		id: 'questions-listening-and-feedback',
		name: 'Questions, Listening & Feedback',
		blurb:
			'Asking better questions, listening past the first answer, and making sure the message actually landed.',
	},
	{
		id: 'goal-setting-and-accountability',
		name: 'Goal Setting & Accountability',
		blurb:
			'Writing goals down, reflecting back before planning forward, and the follow-up that turns a goal into a result.',
	},
	{
		id: 'purpose-and-vision',
		name: 'Purpose & Vision',
		blurb: 'Why you exist and where you are going — for a life and for an organization.',
	},
	{
		id: 'quality-operations-and-the-internal-customer',
		name: 'Quality, Operations & the Internal Customer',
		blurb:
			'Nside/Outside, internal customer chains and quality improvement, drawn from running an actual moving-and-storage company.',
	},
	{
		id: 'principled-decisions-and-mindset',
		name: 'Principled Decisions & Mindset',
		blurb:
			'Principle over expediency, abundance over scarcity, and changing what you think before changing what you do.',
	},
	{
		id: 'growing-yourself-and-your-people',
		name: 'Growing Yourself & Your People',
		blurb:
			'The leader is the lid. Personal growth comes first, then everyone else’s — and the difference between training and development.',
	},
	{
		id: 'core-values',
		name: 'Core Values',
		blurb:
			'Discovering the values you already hold, validating them, and keeping them alive long after the poster goes up.',
	},
	{
		id: 'working-on-the-business',
		name: 'Working ON the Business',
		blurb:
			'The ON/IN principle — draining the swamp instead of spending every day fighting the alligators.',
	},
	{
		id: 'company-wide-events-and-workshops',
		name: 'Company-Wide Events & Workshops',
		blurb:
			'The mechanics of getting everyone in one room and making it count: QIC-Days, table groups, flip charts, games and follow-through.',
	},
];

export const TOPIC_BY_ID = new Map(TOPICS.map((t) => [t.id, t]));
