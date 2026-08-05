import React from 'react';

import Anchor from '../../partials/anchor';
import Name from '../../partials/name';
import NotePad from '../../partials/pad/note';
import Paragraph from '../../partials/paragraph';

const ConceptKeyPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-key-page ${ className }` }>
        <h1>Key</h1>
        <BodyCurrent />
    </article>
);

export default ConceptKeyPage;

function BodyCurrent() {
    return (
        <div>
			<h3>What is a key?</h3>
			<Paragraph>
				A key is an arbitrary name assigned to an instance of the <Name /> context at creation.
			</Paragraph>
			<Paragraph>
				This key is a requirement in all environments.
			</Paragraph>
			<Paragraph>
				A given <Name /> instance designated to a server request { '(or a browser application)' } is identifiable through this value.
			</Paragraph>
			<Paragraph>
				An attempt to reuse this key within a given server request { '(or a browser application)' } will result in error.
				<NotePad>The existing instant residing at the <code>key</code> will be returned if its <code>{ `createEagleEye({...})` }</code> payload matches the current payload with the exact same <Anchor to="/concepts/request-token"><code>requestToken</code></Anchor> object.</NotePad>
			</Paragraph>
			<Paragraph>
				Please see example in: 
				<ul>
					<li><Anchor to="/getting-started#create-context-usage">Creating the <Name /> store.</Anchor></li>
				</ul>
			</Paragraph>
        </div>
    );
}
