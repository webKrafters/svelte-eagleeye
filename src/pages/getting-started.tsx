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
import SelectTab from '../partials/select-tab';

import '../partials/contents/getting-started-page/style.scss';

const GettingStartedPage : React.FC<PageProps> = ({ className }) => (
    <article className={ `getting-started-page ${ className }` }>
        <h1>Getting Started</h1>
        <BodyCurrent />
    </article>
);

export default GettingStartedPage;

export const Head : HeadFC = () => ( <title>Getting Started</title> );

const sampleContextArtifacts =
`export const initState = {
    a: {
        b: {
            c: null,
            x: {
                v: false,
                y: {
                    z: [ 2022 ]
                }
            }
        }
    }
};

export type DemoState = typeof initState;

export const ContextKey = 'My Demo Context';

export const pageSelectorMap = {
    active: 'a.b.x.v',
    year: 'a.b.x.y.z[0]'
};`;

const sampleServerHook =
`import type { Handle } from '@sveltejs/kit';

import {
    FULL_STATE_SELECTOR,
    type RequestToken
    useEagleEye
} from '@webkrafters/svelte-eagleeye';

import { ContextKey } from './demo-context-artifacts.ts';

export const handle : Handle = async ({ event, resolve }) => {
    event.locals.requestToken = { // immediately create and share a unique ID for this incoming request 
        _id: crypto.randomUUID()
    } as RequestToken;
    const response = await resolve( event ); // layouts, pages and components are processed and resolved here.
    const ctx = useEagleEye({ // using \`useEagleEye(...)\` as svelte getContext is not accessible from here
        key: ContextKey,
        requestToken: event.locals.requestToken
    });
    console.log( ctx.store.getState([ FULL_STATE_SELECTOR ]); // log final state of this EagleEye context data
    return response;
};`;

const sampleServerLayout =
`import { initState } from '../demo-context-artifacts.ts';

let demoCtxValue = { ...initState };

/* build up \`demoCtxValue\` with request dependent operations as needed. */

export const load = async ({ locals }) => ({
    demoCtxValue,
    requestToken: locals.requestToken
});`;

const sampleLayoutUniversal =
`<script lang="ts" module>
    import {
        ContextKey,
        type DemoState
    } from '../demo-context-artifacts.ts';
    export const CTX_KEY = ContextKey;
</script>
<script lang="ts">
    import { setContext, untrack } from 'svelte';
    import { createEagleEye } from '@webkrafters/svelte-eagleeye';

    const { data, children } = $props();

    const { requestToken, value } = untrack( () => data );

    const { value: ctx } = createEagleEye<DemoState>({
        key: CTX_KEY,
        prehooks?,
        requestToken,
        value,
        storage?
    });
    // can tie this instance to component tree making it easier to obtain in the component environment by:
    setContext( CTX_KEY, ctx ); // does not have to be CTX_KEY but assures naming consistency
    ...
</script>

{@render children()}
`;

const sampleLayoutUniversal2 =
`<script lang="ts" module>
    import {
        ContextKey,
        type DemoState
    } from '../demo-context-artifacts.ts';
    export const CTX_KEY = ContextKey;
</script>
<script lang="ts">
    import { setContext, untrack } from 'svelte';
    import { createEagleEye } from '@webkrafters/svelte-eagleeye';

    const { data, children } = $props(); // from the server load function

    const { requestToken, value } = untrack( () => data );

    const { value: ctx } = createEagleEye<DemoState>({
        key: CTX_KEY,
        prehooks?,
        requestToken,
        value,
        storage?
    });
    setContext( CTX_KEY, { ctx, requestToken } ); // \<\-\-\-\-\-
    ...
</script>

{@render children()}
`;

const sampleLayoutCSROnly =
`<script lang="ts" module>
    import {
        ContextKey,
        type DemoState,
        initState
    } from '../demo-context-artifacts.ts';
    let numCreated = 0;
    export const CTX_KEY = 'Testing';
</script>
<script lang="ts">
    import { onMount, setContext } from 'svelte';
    import { createEagleEye } from '@webkrafters/svelte-eagleeye';

    const age = $state( 0 );
    const testNumber = $state( 0 );

    const { value: ctx } = createEagleEye<DemoState>({
        key: CTX_KEY, // does not have to be CTX_KEY but assures naming consistency
        value: initState,
        prehooks?,
        storage?
    });
    // can tie this instance to component tree making it easier to obtain in the component environment by:
    setContext( CTX_KEY, ctx );

    ...

    onMount(() => { testNumber = ++numCreated });

    $effect(() => {
        const t = setTimeout(() => { age++ }, 6e4 );
        return () => clearTimeout( t );
    });
</script>

{@render children()}
<div style={ 'border-top: 1px dotted #666; display: flex; justify-contentt: space-even;' }>
    <div>Age in minutes: { age }.</div>
    <span>App instance #: { testNumber }</span>
</div>`;

const sampleComponent =
`<script lang="ts">
    import { getContext } from 'svelte';
    import { pageSelectorMap } from './demo-context-artifacts.ts';
    import { CTX_KEY } from './+layout.svelte';
    
    const ctx = getContext( CTX_KEY );
    const {
        data, // this will never be subject to loss of reactivity
        setState
    } = ctx.stream( 'MY INDEX PAGE', pageSelectorMap );

    const CTA = $derived( data.active ? 'deactivate' : 'activate' );

    const toggleStatus = () => setState({
        a: { b: { x: { v: !data.active } } }
    });
    ...
</script>

<div>{ JSON.stringify( data, null, 2 ) }</div>
<button onclick={ toggleStatus }>{ CTA }</button>`;

const streamContextCode_7_0_0_1 =
`<script lang="ts">
    import { type SvelteEagleEye } from '@webkrafters/svelte-eagleeye';
    import {
        ContextKey,
        type DemoState,
        pageSelectorMap
    } from './demo-context-artifacts.ts';

    const { data } = getContext<SvelteEagleEye<DemoState>>( ContextKey )
                        .stream( 'MY CONTAINER I', {
                            year: pageSelectorMap.year
                        } );

</script>
<div>Year: { data.year }</div>;`;

const streamContextCode_7_0_0_2 =
`<script lang="ts">
    import { type SvelteEagleEye } from '@webkrafters/svelte-eagleeye';
    import {
        ContextKey,
        type DemoState,
        pageSelectorMap
    } from './demo-context-artifacts.ts';

    const { stream } = getContext<SvelteEagleEye<DemoState>>( ContextKey );
    
    const {
        data, resetState, setState
    } = stream( 'MY CONTAINER II', {
        year: pageSelectorMap.year
    });

    const onChange = e => setState({
        a: { b: { x: { y: { z: { 0: e.target.value } } } } }
    } as DemoState );

    $effect(() => data.year > 2049 && resetState([ 'a.b.c' ]);
</script>
<div>Year: <input type="number" onchange={ onChange } /></div>`;              

const streamContextCode_7_0_0 =
`<script lang="ts">
    import Client1 from './Client1.svelte';
    import Client2 from './Client2.svelte';
</script>
<Client1 />
<Client2 />`;

const discardContextTrigger =
`<script lang="ts">
    import { getContext, onDestroy } from 'svelte';
    import { discardEagleEye } from '@webkrafters/svelte-eagleeye';
    import { CTX_KEY } from './+layout.svelte';
    
    const { requestToken } = getContext( CTX_KEY );

    onDestroy(() => discardEagleEye({
        key: CTX_KEY, requestToken
    }));
</script>`;

function BodyCurrent() {
    return (
        <>
            <Paragraph className="snippet-intro" id="install">
                <Name /> is an independent state manager, which once created, can be passed as an argument to any function and/or deployed at any location within an application without further ado. 
            </Paragraph>
            <Paragraph className="snippet-box" id="usage">
                <CodeBlock isInline>
                    npm install --save @webkrafters/svelte-eagleeye
                </CodeBlock>
            </Paragraph>
            <Paragraph className="snippet-intro" id="introduction">
                Four <strong>{ '(' }4{ ')' }</strong> module functions are provided for integrating this context within the Svelte application environment. Namely:
                <ListItem>
                    <div>
                        <strong>allKeysIn:</strong> lists keys of all <Name /> instance assigned to a request.
                        <NotePad>Each <Name /> instance is mapped to at most one single request identified by its <code>requestToken</code>. Where no <code>requestToken</code> is assigned, such as in the browser environment, the instance is directly assigned to the application</NotePad>
                        <NotePad>A server request is identified by an arbitrary <code>requestToken</code> object holding unique string <code>_id</code> value. While <code>requestToken</code> may be used on the browser environment, it is unnecessary.</NotePad>
                    </div>
                </ListItem>
                <ListItem>
                    <div>
                        <strong>createEagleEye:</strong> creates an <Name /> instance matching an arbitrary key { '[' }and optional arbitrary requestToken { '(' }a server request requirement{ ')' }{ ']' }. It returns the instance along with its identifying information.
                        <NotePad>The <code>requestToken</code> object and its <code>_id</code> property must be unique in the appilcation. The key for each <Name /> created under each <code>requestToken</code> must be unique within the request.</NotePad>
                        <NotePad>When an instance whose creation payload matching the current payload exists, that instance is returned instead of creating a duplicate instance. It also returns this instance along with its identifying information.</NotePad>
                    </div>
                </ListItem>
                <ListItem>
                    <div>
                        <strong>discardEagleEye:</strong> closes and removes from an application the <Name /> instance matching its assigned key { '[' }and, if assigned, its requestToken object{ ']' }.
                        <NotePad>Once called, any <code>useEagleEye</code> attempts on this <code>requestToken</code>-<code>key</code> combination return null. Accessing it using the Svelte <code>getContext(...)</code> will produce and <Name /> instance whose <code>closed</code> property is set.</NotePad>
                    </div>
                </ListItem>
                <ListItem>
                    <div>
                        <strong>useEagleEye:</strong> returns the <Name /> instance matching its assigned key { '[' }and, if assigned, its requestToken object{ ']' }.
                        <NotePad>This function makes an <Name /> instance accessible throughout the application. While in a Svelte component script, it is more effective to capture the <Name /> instance within the Svelte context and easily access it through out a component tree section that way.</NotePad>
                    </div>
                </ListItem>
            </Paragraph>
            <Paragraph className="snippet-intro" id="create-context-usage">
                <h3>Creating the <Name /> store</h3>
                To obtain a fresh context store, just call the <code>createEagleEye(...)</code> function. Though, how this is achieved depends largely on the runtime environment, as will be demonstrated shortly:
            </Paragraph>
            <SelectTab options={[{
                label: <strong>Env: SSR - Universal App example (.svelte & .ts)</strong>,
                value: (
                    <>
                        <Paragraph className="snippet-box">
                            <Header>src/demo-context-artifacts.ts</Header>
                            <CodeBlock>{ sampleContextArtifacts }</CodeBlock>
                        </Paragraph>
                        <Paragraph className="snippet-box">
                            <Header>src/hooks.server.ts</Header>
                            <CodeBlock>{ sampleServerHook }</CodeBlock>
                        </Paragraph>
                        <Paragraph className="snippet-box">
                            <Header>src/routes/+layout.server.ts</Header>
                            <CodeBlock>{ sampleServerLayout }</CodeBlock>
                        </Paragraph>
                        <Paragraph className="snippet-box">
                            <Header>src/routes/+layout.svelte</Header>
                            <CodeBlock>{ sampleLayoutUniversal }</CodeBlock>
                        </Paragraph>
                        <Paragraph className="snippet-box">
                            <Header>src/routes/+page.svelte</Header>
                            <CodeBlock>{ sampleComponent }</CodeBlock>
                        </Paragraph>
                    </>
                )
            }, {
                label: <strong>Env: CSR Only App example { '(' }.svelte{ ')' }</strong>,
                value: (
                    <>
                        <Paragraph className="snippet-box">
                            <Header>src/demo-context-artifacts.ts</Header>
                            <CodeBlock>{ sampleContextArtifacts }</CodeBlock>
                        </Paragraph>
                        <Paragraph className="snippet-box">
                            <Header>src/routes/+layout.svelte</Header>
                            <CodeBlock>{ sampleLayoutCSROnly }</CodeBlock>
                        </Paragraph>
                        <Paragraph className="snippet-box">
                            <Header>src/routes/+page.svelte</Header>
                            <CodeBlock>{ sampleComponent }</CodeBlock>
                        </Paragraph>
                    </>
                )
            }]} />
            <div className="snippet-intro" id="streaming">
                <h3>Joining the <Name /> change stream</h3>
                <Paragraph><Name /> change stream is a reactive store whose data are automatically changing to reflect most recent changes affecting them. </Paragraph>
                <Paragraph>It embodies the "set-it-and-forget-it" paradigm. Just set up a list of property paths to state slices to observe { '(' }see <Anchor to="/concepts/selector-map">Selector Map</Anchor>{ ')' }. The context takes care of the rest.</Paragraph>
                <Paragraph>The following shows how to join the <Name /> stream.</Paragraph>
                <Paragraph>We use the context's <code>stream(...)</code> property to obtain an active store exposing the context change stream to our consumer component.</Paragraph>
            </div>
            <Paragraph className="snippet-box">
                <Header>src/components/Client1.svelte</Header>
                <CodeBlock>{ streamContextCode_7_0_0_1 }</CodeBlock>
                <Header>src/components/Client2.svelte</Header>
                <CodeBlock>{ streamContextCode_7_0_0_2 }</CodeBlock>
                <Header>src/components/Ui.svelte</Header>
                <CodeBlock>{ streamContextCode_7_0_0 }</CodeBlock>
            </Paragraph>
            <div className="snippet-intro" id="discarding">
                <h3>Discarding a <Name /> context instance</h3>
                <Paragraph>The <Name /> runs decoupled from its embodying application, simply providing an active place for the application to accumulate, access, update and delete its various states as needed in ways that maintain immutability and integrity of state data. The <code>discardEagleEye</code> function removes it from the application, making it immediately GC eligible, as long as there no local references to it. The following is a contrived snippet to demonstrate.</Paragraph>
                <Paragraph>
                    Discarding the instance in a purely server .ts script or a CSR-only application script is fairly straight-forward for the following reasons:
                    <ol>
                        <li>in a purely server .ts script, the <code>requestToken</code> object is readily available.</li>
                        <li>in a CSR-only application, the <code>requestToken</code> object is not needed to create an <Name /> instance. Even when a <code>requestToken</code> was applied, it remained at the component level.</li>
                    </ol>
                </Paragraph>   
                <Paragraph>   
                    Discarding the instance in a universal application from a componenent script can be a complex task. It requires sharing the <code>requestToken</code> object between the server scripts and the Svelte component for the following reasons:
                    <ol>
                        <li>the <code>requestToken</code> object is not readily available. The server script must assign this per server request and shared with the component.</li>
                        <li>the <code>requestToken</code> object, once in the componeent script, is not accessible throughout the component tree. Immediately captture this object in a Svelte context to be retrieved from any part of the component tree requiring the <code>discardEagleEye</code> call.</li>
                    </ol>
                </Paragraph>
                <Paragraph className="snippet-box">
                    <Header>src/routes/+layout.svelte</Header>
                    <CodeBlock>{ sampleLayoutUniversal2 }</CodeBlock>
                </Paragraph>
                <Paragraph className="snippet-box">
                    <Header>src/components/DiscardContext.svelte</Header>
                    <CodeBlock>{ discardContextTrigger }</CodeBlock>
                </Paragraph>
            </div>
        </>
    );
}
