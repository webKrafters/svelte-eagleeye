import type { HeadFC } from 'gatsby';

import type { PageProps } from '../contexts/page';

import React from 'react';

import Anchor from '../partials/anchor';
import CodeBlock from '../partials/code-block';
import Header from '../partials/segment-header';
import Name from '../partials/name';
import NotePad from '../partials/pad/note';
import Paragraph from '../partials/paragraph';

const GettingStartedPage : React.FC<PageProps> = ({ className }) => (
    <article className={ `getting-started-page ${ className }` }>
        <h1>Getting Started</h1>
        <BodyCurrent />
    </article>
);

export default GettingStartedPage;

export const Head : HeadFC = () => ( <title>Getting Started</title> );

const creatorCode_7_0_0 =
`import { createEagleEye } from '@webkrafters/svelte-eagleeye';
const MyContext = createEagleEye({
    a: { b: { c: null, x: { y: { z: [ 2022 ] } } } }
});
export const useMyStream = MyContext.stream;
export default MyContext;`

const containerCode =
`<script lang="ts">
    import MyContext from './context';
    import Ui from './ui';
                            
    const { ageInMinutes = 0 } = $props();

    $effect(() => MyContext.store.setState({ c: ageInMinutes }));

</script>

<Ui />`;

const streamContextConstantsCode_7_0_0 =
`export const selectorMap = { year: 'a.b.x.y.z[0]' };`;

const streamContextCode_7_0_0_1 =
`<script lang="ts">
    import { useMyStream } from './context';
    import { SelectorMap } from './constants';

    const { data } = useMyStream( SelectorMap );

</script>
<div>Year: { data.year }</div>;`;

const streamContextCode_7_0_0_2 =
`<script lang="ts">
    import { useMyStream } from './context';
    import { SelectorMap } from './constants';

    const { data, setState, resetState } = useMyStream( SelectorMap );

    const onChange = e => setState({
        a: { b: { x: { y: { z: { 0: e.target.value } } } } }
    });

    $effect(() => data.year > 2049 && resetState([ 'a.b.c' ]);
</script>
<div>Year: <input type="number" on:change="onChange" /></div>`;              

const streamContextCode_7_0_0 =
`<script lang="ts">
    import Client1 from './Client1';
    import Client2 from './Client2';
</script>
<div>
    <Client1 />
    <Client2 />
</div>`;

const setupCode_7_0_0 =
`<script module>
    let numCreated = 0;
</script>
<script lang="ts">
    import { onMount } from 'svelte';
    import Container from './container';

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
                <Name /> is an independent state manager, which once created, can be deployed at any location in all parts of the application without further ado. 
            </Paragraph>
            <Paragraph className="snippet-box" id="usage">
                <CodeBlock isInline>
                    npm install --save @webkrafters/svelte-eagleeye
                </CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-intro" id="create-context-usage">
                <h3>Creating the <Name /> store</h3>
                To obtain a fresh context store, just call the <code>createEagleEye(...)</code> function. 
            </Paragraph>
            <Paragraph className="snippet-box">
                <Header>context.svelte.ts</Header>
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
                <Header>constants.svelte.ts</Header>
                <CodeBlock>{ streamContextConstantsCode_7_0_0 }</CodeBlock>
                <Header>Client1.svelte</Header>
                <CodeBlock>{ streamContextCode_7_0_0_1 }</CodeBlock>
                <Header>Client2.svelte</Header>
                <CodeBlock>{ streamContextCode_7_0_0_2 }</CodeBlock>
                <Header>Ui.svelte </Header>
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
