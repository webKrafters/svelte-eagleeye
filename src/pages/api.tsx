import React from 'react';

import Anchor from '../partials/anchor';
import ListItem from '../partials/list-item';
import Name from '../partials/name';

const ApiPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `api-page ${ className }` }>
        <h1>API</h1>
        <BodyCurrent />
    </article>
);

export default ApiPage;

function BodyCurrent(){
    return (
        <>
            <div id="cache">
                <h3>cache</h3>
                <ListItem><div>is a property providing access to the underlying immutable cache managed by this <Name /> instance.</div></ListItem>
            </div>
            <div id="closed">
                <h3>closed</h3>
                <ListItem><div>is a boolean property confirming that the context is still active.</div></ListItem>
                <ListItem><div>Use the <Anchor to="/external-access#subscribing-to-context-disposal">"closing"</Anchor> event to be notified right before context deactivation.</div></ListItem>
                <ListItem><div>Please see the <Anchor to="/api#dispose">dispose</Anchor> method below.</div></ListItem>
            </div>
            <div id="create-context">
                <h3>createEagleEye</h3>
                <ListItem><div>is a function accepting three optional parameters { '(' }to wit: the initial state object or an <Anchor to="https://auto-immutable.js.org/getting-started/">AutoImmutable</Anchor> instance bearing this initial state object, the <Anchor to="/concepts/prehooks">prehooks</Anchor> and the <Anchor to="/concepts/storage">storage</Anchor>{ ')' } and returning a <Name /> context.</div></ListItem>
                <ListItem><div>The returned instance is the store-bearing context.</div></ListItem>
                <ListItem><div>The context's <Anchor to="/external-access">store</Anchor> is directly accessible through its <code>store</code> property.</div></ListItem>
                <ListItem><div>A change stream <Anchor to="/concepts/store">store</Anchor> for this <code>context</code> can be obtained either by assessing its <code>stream</code> property  its <Anchor to="/api#stream">stream</Anchor> property.</div></ListItem>
            </div>
            <div id="dispose">
                <h3>dispose</h3>
                <ListItem><div>is a context method to deactivates this context.</div></ListItem>
                <ListItem><div>Context deactivation is permanent.</div></ListItem>
                <ListItem><div>The context's <Anchor to="/api#closed"><code>closed</code></Anchor> property confirms this status.</div></ListItem>
            </div>
            <div id="stream">
                <h3>stream</h3>
                <ListItem><div>is a property of the <Name /> instance intentionally made as a no-frills means for observing  and communicating with this instance.</div></ListItem>
                <ListItem><div>It accepts an optional <Anchor to="/concepts/selector-map">selector map</Anchor> parameter; and returns a change stream context <Anchor to="/concepts/store">store</Anchor>.</div></ListItem>
                <ListItem><div>The injected <Anchor to="/concepts/store">store</Anchor> monitors changes in the underlying state slices referenced by the selector map.</div></ListItem>
                <ListItem><div>A change in any of the referenced state slices automatically triggers an update of the related <code>store.data</code> property and a subsequent render of the client.</div></ListItem>
            </div>
        </>
    );
}
