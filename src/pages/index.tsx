import type { HeadFC } from 'gatsby';

import type { PageProps } from '../contexts/page';

import React from 'react';

import { graphql } from 'gatsby';

import Anchor from '../partials/anchor';
import CodeBlock from '../partials/code-block';
import License from '../partials/license-link';
import Name from '../partials/name';
import Paragraph from '../partials/paragraph';

import '../partials/contents/index-page/style.scss';
import NotePad from '../partials/pad/note';

export type Props = PageProps<{
	site : {
		siteMetadata : {
			url : {
				demo : string,
				npm : string
			}
		}
	}
}>;

const IndexPage : React.FC<Props> = ({ className, data }) => {

	let devDisclaimer = null;
	devDisclaimer = (
		<h2 style={{ color: '#b32d00' }}>
			Under construction ... Please, do not use this at this time ... Documentation will be ready soon.
		</h2>
	);

	return (
		<article className={ `index-page ${ className }` }>
			{ devDisclaimer }
			<h1>Welcome to <Name /> JS!</h1>
			<NotePad>Compatible with Vue 3 and above.</NotePad>
			<Paragraph>An intuitive reactive context based vue state manager. No complex wirings required. Create once: use everywhere both in and out of the Vue component hierarchy.</Paragraph>
			<Paragraph>Supports for framework-agnostic state sharing among applications OOB. Simply create an <Anchor to="https://auto-immutable.js.org/intro/">Auto Immutable</Anchor> instance to pass around as the <code>value</code> argument for this or any <Anchor to="https://eagleeye.js.org">Eagle Eye</Anchor> based <Anchor to="https://www.npmjs.com/package/@webkrafters/eagleeye?activeTab=readme#usage">state manager</Anchor> instances.</Paragraph>
			<Paragraph>
				<label>
					<b>Official:{ ' ' }</b>
					<Anchor to={ data?.site.siteMetadata.url.npm as string }>
						<Name />
					</Anchor>
				</label>
			</Paragraph>
			<Paragraph className="installation">
				<header>Installation:</header>
				<label>
					<b>Main:</b>
					<CodeBlock isInline>
						npm install --save @webkrafters/vue-eagleeye
					</CodeBlock>
				</label>
			</Paragraph>
			<Paragraph>
				<label>
					<b>Usage: </b>
					<Anchor to="/getting-started/#usage" style={{ fontWeight: 500 }}>Getting Started.</Anchor>
				</label>
			</Paragraph>
			<Paragraph>
				<label>
					<b>Play with a demo app here on:{ ' ' }</b>
					<Anchor to={ data?.site.siteMetadata.url.demo as string }>
						Code Sandbox
					</Anchor>
				</label>
				<div>
					Should the sandbox fail to load app, please clone and run the demo repo as follows.
					<ol>
						<li>open your command line interface in your local machine.</li>
						<li>run <code>git clone https://github.com/webKrafters/vue-eagleeye-app.git</code></li>
						<li>run <code>cd vue-eagleeye-app</code></li>
						<li>run <code>npm install &amp;&amp; npm run dev</code></li>
						<li>open the URL displayed at then of this script run.</li>
					</ol>
				</div>
			</Paragraph>
			<Paragraph>
				<label>
					<b>License:{ ' ' }</b>
					<License />
				</label>
			</Paragraph>
			<h2><Name />. Why now?</h2>
			<ul>
				<li>Auto-immutable update-friendly context. See <Anchor to="/concepts/store/setstate"><code>store.setState</code></Anchor>.</li>
				<li>A context bearing an observable consumer <Anchor to="/concepts/store">store</Anchor>.</li>
				<li>Recognizes <strong>negative array indexing</strong>. Please see <Anchor to="/concepts/property-path">Property Path</Anchor> and <code>store.setState</code> <Anchor to="/concepts/store/setstate#indexing">Indexing</Anchor>.</li>
				<li>Only re-renders subscribing components (<Anchor to="/concepts/client">clients</Anchor>) on context state changes.</li>
				<li>Subscribing component decides which context state properties' changes to trigger its update.</li>
			</ul>
			<div>May see features history at <Anchor to="/history/features">What's Changed?</Anchor></div>
		</article>
	);
}

export default IndexPage;

export const query = graphql`
    query IntroTitle {
        site {
            siteMetadata {
                url {
					demo
					npm
				}
            }
        }
    }
`;

export const Head : HeadFC = () => (
	<meta
		content="Welcome to Vue Eagle Eye!"
		name="description"
	/>
);
