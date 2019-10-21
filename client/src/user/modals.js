import React, { useState } from 'react';
import { Card, Button, Modal, TextContainer } from '@shopify/polaris';

export default function PrivacyPolicy(props) {

    const [policyModal, setPolicyModal] = useState(false);

    const toggleModal = () => setPolicyModal(!policyModal);

    return (
        <React.Fragment>
            <Button plain onClick={toggleModal}>Privacy Policy</Button>
            <Modal
                open={policyModal}
                onClose={toggleModal}
                primaryAction={{
                    content: 'Close',
                    onAction: toggleModal,
                }}
            >
                <Modal.Section>
                    <Card title="Privacy Policy" sectioned>
                        <Card.Section>
                            <TextContainer>
                                <p>
                                    We understand that reading policy agreement is a boring and time-consuming exercise and for your piece of mind we outline our key privacy principles below,
                                    <ul>
                                        <li>We don’t ask you for your personal data unless we truly need it.</li>
                                        <li>We don’t share your personal data with anyone except to comply with the law, develop our products, or protect our rights.</li>
                                        <li>We don’t store personal data on our servers unless required for the on-going operation of one of our services.</li>
                                    </ul>
                                </p>
                                <p>
                                    Last updated: June 25th, 2018.
                                    This page contains the current privacy policy.
                                </p>
                                <p>
                                    This Privacy Policy applies to the processing of personal data concerning the users ("Users") of services provided by Marketcube ("Service(s)").
                                    This policy explains what personal data we collect and how we use it.
                                    The Users can be Marketcube's customers ("Customer"), who operate their own marketplace, representatives of Customer or Customer's customers ("End-Users").
                                    The marketplace operated by the Customer is subject to its own privacy policy.
                                    Marketcube does not take any responsibility of its Customers' or other third parties' privacy policies or processing of personal data in its Customers' or third parties' operations.
                                </p>
                            </TextContainer>
                        </Card.Section>
                    </Card>
                </Modal.Section>
            </Modal>
        </React.Fragment>
    )
}

export function TermsUsed(props) {

    const [termsModal, setTermsModal] = useState(false);

    const toggleModal = () => setTermsModal(!termsModal);

    return (
        <React.Fragment>
            <Button plain onClick={toggleModal}>Terms of Use</Button>
            <Modal
                open={termsModal}
                onClose={toggleModal}
                primaryAction={{
                    content: 'Close',
                    onAction: toggleModal,
                }}
            >
                <Modal.Section>
                    <Card title="Terms of Use" sectioned>
                        <Card.Section>
                            <TextContainer>
                                <p>
                                    These Terms of Use are applicable to the agreement between Marketcube Limited,
                                    a limited liability company incorporated and existing under the laws of United Kingdom,
                                    having its principal place of business at 77 New Cavendish Street, W1W6XB, London, UNITED KINGDOM (“Marketcube”) and
                                    yourself as the other party entering into this agreement ("You").
                                </p>
                                <p>
                                    You and Marketcube are hereinafter jointly referred to as the "Parties" and each separately as a "Party".
                                </p>
                                <p>
                                    The agreement consisting of these Terms of Use and other documentation referred to in these Terms of Use (“Agreement”)
                                    shall govern your use of the Marketcube service that enables You to setup an online marketplace (the “Service“).
                                    This Agreement governs Your use of any products and services provided by Marketcube.
                                </p>
                                <p>
                                    By using the Service in any way, You acknowledge, represent and warrant that You have reviewed and accept this Agreement and,
                                    if You have indicated that You act on behalf of an entity, are authorized to act on behalf of such entity.
                                </p>
                                <p>
                                    If You do not wish to be bound by this Agreement, do not use, access or register with the Service.
                                </p>
                            </TextContainer>
                        </Card.Section>
                    </Card>
                </Modal.Section>
            </Modal>
        </React.Fragment>
    )
}
