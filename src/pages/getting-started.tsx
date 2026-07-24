import type { HeadFC } from 'gatsby';

import type { PageProps } from '../contexts/page';

import React from 'react';

import Anchor from '../partials/anchor';
import CodeBlock from '../partials/code-block';
import Header from '../partials/segment-header';
import Name from '../partials/name';
import NotePad from '../partials/pad/note';
import Paragraph from '../partials/paragraph';
import ListItem from '../partials/list-item';

const GettingStartedPage : React.FC<PageProps> = ({ className }) => (
    <article className={ `getting-started-page ${ className }` }>
        <h1>Getting Started</h1>
        <BodyCurrent />
    </article>
);

export default GettingStartedPage;

export const Head : HeadFC = () => ( <title>Getting Started</title> );

const contextArtifacts_7_0_0 = // './demo-context.ts'
`export const initState = {
    a: {
        b: {
            c: null,
            x: {
                y: {
                    z: [ 2022 ]
                }
            }
        }
    } 
};

export type DemoState = typeof initState;

export const description = 'My Demo Context';`;

const creatorCode_7_0_0 = // './provider.svelte'
`<script lang='ts'>
    import { createEagleEye } from '@webkrafters/svelte-eagleeye';
    import { description, defaultState } from './demo-context.ts';

    const { children } = $props();

    createEagleEye<DemoState>({
        CTX_DESC: description,
        value: defaultState
    });
</script>

{@render(children())}`;

const containerCode = // './container.svelte'
`<script lang="ts">
    import { useEagleEye } from '@webkrafters/svelte-eagleeye';
    import { description, type DemoState } from './demo-context.ts';
    import Provider from './provider.svelte';
    import Ui from './ui';
                            
    const { ageInMinutes = 0 } = $props();

    const ctx = useEagleEye<DemoState>( description );

    $effect(() => ctx.store.setState({ c: ageInMinutes }));

</script>

<Provider>
    <Ui />
</Provider>`;

const streamContextConstantsCode_7_0_0 = // './constants.ts
`export const selectorMap = { year: 'a.b.x.y.z[0]' };`;

const streamContextCode_7_0_0_1 = // './Client1.svelte'
`<script lang="ts">
    import { useEagleEye } from '@webkrafters/svelte-eagleeye';
    import { description, type DemoState } from './demo-context.ts';
    import { SelectorMap } from './constants.ts';

    const { data } = useEagleEye<DemoState>( description )
                        .stream( 'MY CONTAINER I', SelectorMap );

</script>
<div>Year: { data.year }</div>;`;

const streamContextCode_7_0_0_2 = // './Client2.svelte'
`<script lang="ts">
    
    import { useEagleEye } from '@webkrafters/svelte-eagleeye';
    import { description, type DemoState } from './demo-context.ts';
    import { SelectorMap } from './constants.ts';

    const { stream } = useEagleEye<DemoState>( description );

    const {
        data,
        resetState,
        setState
    } = stream( 'MY CONTAINER II', SelectorMap );

    const onChange = e => setState({
        a: { b: { x: { y: { z: { 0: e.target.value } } } } }
    } as DemoState );

    $effect(() => data.year > 2049 && resetState([ 'a.b.c' ]);
</script>
<div>Year: <input type="number" onchange={ onChange } /></div>`;              

const streamContextCode_7_0_0 = // './Ui.svelte'
`<script lang="ts">
    import Client1 from './Client1.svelte';
    import Client2 from './Client2.svelte';
</script>
<div>
    <Client1 />
    <Client2 />
</div>`;

const setupCode_7_0_0 = // './app.svelte'
`<script module>
    let numCreated = 0;
</script>
<script lang="ts">
    import { onMount } from 'svelte';
    import Container from './container.svelte';

    const age = $state( 0 );
    const testNumber = $state( 0 );

    onMount(() => { testNumber = ++numCreated });

    $effect(() => {
        const t = setTimeout(() => { age++ }, 6e4 );
        return () => clearTimeout( t );
    });
</script>
<div>
    <h2>App instance #: { testNumber }</H2>
    <Container ageInMinutes={ age } />
</div>`;

function BodyCurrent() {
    return (
        <>
            <Paragraph className="snippet-intro" id="install">
                <Name /> is an independent state manager, which once created, can be passed as an argument to any function with in the app and/or deployed at any location from the point of creation unto all child and descendant components without further ado. 
            </Paragraph>
            <Paragraph className="snippet-intro" id="create-context-usage">
                Three module functions are provided for integrating this context within the Svelte application environment. Namely:
                <ListItem><div><strong>createEagleEye:</strong> creates and embeds within the component tree an EagleEye context instance matching a given description. This function must be called at the top parent component. This makes the coontext retrievable from all child and descendant components of this component.</div></ListItem>
                <ListItem>
                    <div>
                        <strong>discardEagleEye:</strong> closes and removes from the component tree an EagleEye context instance matching a given description. For instance references outside the component tree, may monitor its status either
                        <ul>
                            <li>by querying its <code>closed</code> property or</li>
                            <li>by observing it through the <strong>CLOSING</strong> event of its <strong><code>store</code></strong> property.</li>
                        </ul>
                    </div>
                </ListItem>
                <ListItem><div><strong>useEagleEye:</strong> produces the EagleEye context instance from the component tree matching a given description. This function should only be used following the <code>createEagleEye</code> call from with the parent and all of its child and descendant components.</div></ListItem>
                <div>In keeping with Svelte rules for context API usage, all three modules must be invoked from within the component startup <code>{ `<script lang="ts">` }</code> section of the <code>.svelte</code> file. However, the returned context can be used anywhere within the app.</div>
            </Paragraph>
            <Paragraph className="snippet-box" id="usage">
                <CodeBlock isInline>
                    npm install --save @webkrafters/svelte-eagleeye
                </CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-intro" id="create-context-usage">
                <h3>Creating the <Name /> store</h3>
                To obtain a fresh context store, just call the <code>createEagleEye(...)</code> function.
                <NotePad>According to Svelte rules for contexts. Be sure to call this function at the top component whose children and descendants will use the context.</NotePad>
            </Paragraph>
            <Paragraph className="snippet-intro" id="create-context-usage">
                <h3>Creating the <Name /> store</h3>
                <div>To obtain a fresh context store, just call the <code>createEagleEye(...)</code> function.</div>
                <NotePad>According to Svelte rules for contexts. Be sure to call this function at the top component whose children and descendants will use the context.</NotePad>
            </Paragraph>
            <Paragraph className="snippet-box">
                <Header>demo-context.ts</Header>
                <CodeBlock>{ contextArtifacts_7_0_0 }</CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-box">
                <Header>provider.svelte</Header>
                <CodeBlock>{ creatorCode_7_0_0 }</CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-box">
                <Header>container.svelte</Header>
                <CodeBlock>{ containerCode }</CodeBlock>
            </Paragraph>
            <div className="snippet-intro" id="streaming">
                <h3>Joining the <Name /> change stream</h3>
                <Paragraph><Name /> change stream is a reactive store whose data are automatically changing to reflect most recent changes affecting them. </Paragraph>
                <Paragraph>It embodies the "set-it-and-forget-it" paradigm. Just set up a list of property paths to state slices to observe { '(' }see <Anchor to="/concepts/selector-map">Selector Map</Anchor>{ ')' }. The context takes care of the rest.</Paragraph>z
                <Paragraph>The following shows how to join the <Name /> stream.</Paragraph>
                <Paragraph>We use the context's <code>stream(...)</code> property to obtain an active store exposing the context change stream to our consumer component.</Paragraph>
            </div>
            <Paragraph className="snippet-box">
                <Header>constants.ts</Header>
                <CodeBlock>{ streamContextConstantsCode_7_0_0 }</CodeBlock>
                <Header>Client1.svelte</Header>
                <CodeBlock>{ streamContextCode_7_0_0_1 }</CodeBlock>
                <Header>Client2.svelte</Header>
                <CodeBlock>{ streamContextCode_7_0_0_2 }</CodeBlock>
                <Header>Ui.svelte</Header>
                <CodeBlock>{ streamContextCode_7_0_0 }</CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-intro">
                The <Name /> runs decoupled from its embodying application, simply providing an active place for the application to accumulate, access, update and delete its various states as needed in ways that maintains immutability and integrity of state data. The following is a contrived snippet to demonstrate.
            </Paragraph>
            <Paragraph className="snippet-box">
                <Header>app.svelte</Header>
                <CodeBlock>{ setupCode_7_0_0 }</CodeBlock>
            </Paragraph>
        </>
    );
}
