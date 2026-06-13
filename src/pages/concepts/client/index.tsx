import React from 'react';

import Anchor from '../../../partials/anchor';
import Name from '../../../partials/name';
import Paragraph from '../../../partials/paragraph';

const ConceptClientPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-client-page ${ className }` }>
        <h1>Client</h1>
        <BodyCurrent />
    </article>
);

export default ConceptClientPage;

function BodyCurrent() {
    return (
        <div>
            <h3>What is a client?</h3>
            <div>
                <Paragraph>
                    A client is any component consuming the <Name /> context. A client consumes this context by:
                    <ul>
                        <li>invoking the context's <Anchor to="/api#stream">stream</Anchor> function property to join the <Name />'s change stream.</li>
                    </ul>
                </Paragraph>
                <Paragraph>
                    Please see example in: 
                    <ol>
                        <li><Anchor to="/getting-started#streaming">Joining the <Name /> change stream.</Anchor></li>
                    </ol>
                </Paragraph>
            </div>
        </div>
    );
}
