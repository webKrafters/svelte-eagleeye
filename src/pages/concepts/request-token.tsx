import React from 'react';

import Anchor from '../../partials/anchor';
import ListItem from '../../partials/list-item';
import Name from '../../partials/name';
import Paragraph from '../../partials/paragraph';

const requestTokenType =
`interface RequestToken {
	_id: string;
}`;

const ConceptRequestTokenPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-request-token-page ${ className }` }>
        <h1>Request Token</h1>
        <BodyCurrent />
    </article>
);

export default ConceptRequestTokenPage;

function BodyCurrent() {
    return (
        <div>
			<code><pre>{ requestTokenType }</pre></code>
            <h3>What is a request token?</h3>
			<Paragraph>
				A request token is an object normally assigned to an incoming server request. All <Name /> instances created at the servicing of the request are identified by this token. It is a requirement in the server.
			</Paragraph>
			<Paragraph>
				While a request token may be assigned to a running application in the browser, it is unnecessary.
			</Paragraph>
			<Paragraph>
				Please see example in: 
				<ul>
					<li><Anchor to="/getting-started#create-context-usage">Creating the <Name /> store.</Anchor></li>
				</ul>
			</Paragraph>
			<h4>Characteristics.</h4>
			<ListItem>
				<div>
					A request token is any arbitrary object of the <code>RequestToken</code> type whose <code>_id</code> property is unique in the applictation at any given time.
				</div>
			</ListItem>
			<ListItem>
				<div>
					An instant request token is recognized both by its reference and by its <code>_id</code> property. An identical object is not recognized as the instant token.
				</div>
			</ListItem>
			<ListItem>
				<div>
					Any attempt to obtain a <Name /> instance using a request token whose <code>_id</code> has been altered will result in error.
				</div>
			</ListItem>
        </div>
    );
}
