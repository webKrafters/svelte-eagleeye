import React from 'react';

import Anchor from '../../../partials/anchor';
import Name from '../../../partials/name';
import NotePad from '../../../partials/pad/note';
import Paragraph from '../../../partials/paragraph';

const ConceptOwnerDescriptorPage : React.FC<{className? : string}> = ({ className }) => (
    <article className={ `concept-owner-descriptor-page ${ className }` }>
        <h1>Owner Descriptor</h1>
        <BodyCurrent />
    </article>
);

export default ConceptOwnerDescriptorPage;

function BodyCurrent() {
    return (
        <div>
			<h3>What is an owner descriptor?</h3>
			<Paragraph>
				An owner descriptor is an arbitrary name describing an instant <Anchor to="/concepts/client">client</Anchor> conducting a stream - as the owner of the stream.
			</Paragraph>
			<Paragraph>
				It is assigned by the instant client to a channel through which it <Anchor to="/getting-started#streaming">streams</Anchor>.
			</Paragraph>
			<Paragraph>
				It is assigned at the point of use as the first argument of the <Anchor to="/getting-started#streaming">stream</Anchor> function property.
			</Paragraph>
			<Paragraph>
				An attempt to assign a similar <code>owner descriptor</code> to multiple clients may lead to collisions such as all clients using that same descriptor value simultaneously exiting the stream access when any of them exits the stream.
			</Paragraph>
			<Paragraph>
				Please see example in: 
				<ul>
					<li><Anchor to="/getting-started#streaming">Joining the <Name /> change stream.</Anchor></li>
				</ul>
			</Paragraph>
        </div>
    );
}
