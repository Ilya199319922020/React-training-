import React from 'react';
import { create } from 'react-test-renderer';
import ProfileStatus from './ProfileStatus';

describe("ProfileStatus component", () => {
	test("Status from props should be state", () => {
		const component = create(<ProfileStatus status="It-Kamasutra" />);
		const instance = component.getInstance();
		expect(instance.state.status).toBe("It-Kamasutra");
	});
	test("<span> should be rendered", () => {
		const component = create(<ProfileStatus status="It-Kamasutra" />);
		const instance = component.root;
		const span = instance.findByType("span");
		expect(span).not.toBeNull();
	});
	test("<input> should be rendered", () => {
		const component = create(<ProfileStatus status="It-Kamasutra" />);
		const root = component.root;
		expect(() => {
			root.findByType("input")
		}).toThrow();
	});
	test("after creation  <span> should displayed", () => {
		const component = create(<ProfileStatus status="It-Kamasutra" />);
		const instance = component.root;
		const span = instance.findByType("span");
		expect(span.innerHtml).not.toBe("It-Kamasutra");
	});
	test("after creation  <span> should correct status", () => {
		const component = create(<ProfileStatus status="It-Kamasutra" />);
		const root = component.root;
		const span = root.findByType("span");
		expect(span.children[0]).toBe("It-Kamasutra");
	});

});

