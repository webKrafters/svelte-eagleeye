import React from 'react';

import Anchor from '../partials/anchor';
import ListItem from '../partials/list-item';
import Name from '../partials/name';
import NotePad from '../partials/pad/note';

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
            <div id="all-keys">
                <h3>allKeysIn</h3>
                <ListItem><div>Enumerates keys of all <Name /> instances created using a given <code>requestToken</code> object.</div></ListItem>
                <ListItem>
                    <div>
                        <div>is a function accepting an optional <code>requestToken</code> argument.</div>
                        <NotePad>If none is provided; will enumerate those of the application when in browser environment.</NotePad>
                    </div>
                </ListItem>
            </div>
            <div id="create-context">
                <h3>createEagleEye</h3>
                <ListItem><div>Provisions a <Name /> instance to the application in ways that negotiates the runtime environment.</div></ListItem>
                <ListItem>
                    <div>
                        <div>is a function accepting a payload consisting of five properties. To wit:</div>
                        <ol>
                            <li><b><u>key:</u></b> a mandatory context key information. { '(' }This key is whatever name you'd like to give this instance.{ ')' }</li>
                            <li><b><u>prehooks:</u></b> the optional <Anchor to="/concepts/prehooks">prehooks</Anchor></li>
                            <li><b><u>storage:</u></b> the optional <Anchor to="/concepts/storage">storage</Anchor></li>
                            <li><b><u>requestToken:</u></b> an object holding a unique <code>_id</code> associated with a server request. Both this object and its reference identify the request. This object is mandatory for every server-side requests but unneccessary in the browser environment. { '(' }The unique <code>_id</code> is whatever string value you'd like to assign the request.{ ')' }</li>
                            <li><b><u>value:</u></b> the optional initial state object or <Anchor to="https://auto-immutable.js.org/getting-started/">AutoImmutable</Anchor> instance bearing this initial state object</li>
                        </ol>
                        <div>and returning an object holding <Name /> instance and its identifying information.</div>
                        <NotePad>Calling this function with a payload matching an existing <Name /> instance will produce an object holding existing instance and its identifying information.</NotePad>
                    </div>
                </ListItem>
                <ListItem><div>The returned instance is the store-bearing context.</div></ListItem>
                <ListItem><div>The context's <Anchor to="/external-access">store</Anchor> is directly accessible through its <code>store</code> property.</div></ListItem>
                <ListItem><div>A change stream <Anchor to="/concepts/store">store</Anchor> for this <code>context</code> can be obtained either by assessing its <code>stream</code> property  its <Anchor to="/api#stream">stream</Anchor> property.</div></ListItem>
            </div>
            <div id="discard-context">
                <h3>discardEagleEye</h3>
                <ListItem><div>Disposes and removes a <Name /> instance from the application.</div></ListItem>
                <ListItem>
                    <div>
                        <div>is a function accepting a payload consisting of two properties. To wit:</div>
                        <ol>
                            <li><b><u>key:</u></b> assigned to this <Name /> at creation.</li>
                            <li><b><u>requestToken:</u></b> assigned to this <Name /> instance at creation.</li>
                        </ol>
                        <NotePad>Once removed, its key cannot be reused. It will always return <code>null</code>.</NotePad>
                    </div>
                </ListItem>
            </div>
            <div id="use-context">
                <h3>useEagleEye</h3>
                <ListItem><div>Produces an existing <Name /> instance matching the supplied payload.</div></ListItem>
                <ListItem>
                    <div>
                        <div>is a function accepting a payload consisting of two properties. To wit:</div>
                        <ol>
                            <li><b><u>key:</u></b> assigned to this <Name /> at creation.</li>
                            <li><b><u>requestToken:</u></b> assigned to this <Name /> instance at creation.</li>
                        </ol>
                    </div>
                </ListItem>
            </div>
            <div id="instance">
                <h3><Name /> Instance</h3>
                <div>Once, the <Name /> instance has been obtained, it can be utilized in the following ways:</div>
                <div id="cache">
                    <h4>cache</h4>
                    <ListItem><div>is a property of the <Name /> instance providing access to the underlying immutable cache that it manages.</div></ListItem>
                </div>
                <div id="closed">
                    <h4>closed</h4>
                    <ListItem><div>is a boolean property of the <Name /> instance confirming that the instance is still active.</div></ListItem>
                    <ListItem><div>Use the <Anchor to="/external-access#subscribing-to-context-disposal">"closing"</Anchor> event to be notified right before context deactivation.</div></ListItem>
                    <ListItem><div>Please see the <Anchor to="/api#dispose">dispose</Anchor> method below.</div></ListItem>
                </div>
                <div id="dispose">
                    <h4>dispose</h4>
                    <ListItem><div>is a method of the <Name /> instance for deactivating this context.</div></ListItem>
                    <ListItem><div>Context deactivation is permanent.</div></ListItem>
                    <ListItem><div>The context's <Anchor to="/api#closed"><code>closed</code></Anchor> property confirms this status.</div></ListItem>
                </div>
                <div id="stream">
                    <h4>stream</h4>
                    <ListItem><div>is a function property of the <Name /> instance intentionally made as a no-frills means for observing and communicating with this instance.</div></ListItem>
                    <ListItem>
                        <div>
                            <div>It accepts:</div>
                            <ol>
                                <li><b><u>ownerDesc:</u></b> a mandatory name to identifying the streaming component. { '(' }This value is whatever name you'd like to assign this component.{ ')' }</li>
                                <li><b><u>selectorMap:</u></b> an optional <Anchor to="/concepts/selector-map">selector map</Anchor> parameter.</li>
                            </ol>
                            <div>and returns a change stream context <Anchor to="/concepts/store">store</Anchor>.</div>
                        </div>
                    </ListItem>
                    <ListItem><div>The injected <Anchor to="/concepts/store">store</Anchor> monitors changes in the underlying state slices referenced by the selector map.</div></ListItem>
                    <ListItem><div>A change in any of the referenced state slices automatically triggers an update of the related <code>store.data</code> property and a subsequent render of the client.</div></ListItem>
                </div>
            </div>
        </>
    );
}
