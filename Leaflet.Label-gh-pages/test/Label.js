/* Helpers */

happen.at = function (what, x, y, props) {
	this.once(document.elementFromPoint(x, y), L.Util.extend({
		type: what,
		clientX: x,
		clientY: y,
		screenX: x,
		screenY: y,
		which: 1,
		button: 0
	}, props || {}));
};

describe('Label', function () {

	var c, map, p2ll,
	    center = [55.8, 37.6];

	beforeEach(function () {
		c = document.createElement('div');
		c.style.width = '400px';
		c.style.height = '400px';
		// Allow to use happen.at with determinist positions.
		c.style.position = 'absolute';
		c.style.top = '0';
		c.style.left = '0';
		document.body.appendChild(c);
		map = new L.Map(c);
		map.setView(center, 6);
		p2ll = function (x, y) {
			return map.layerPointToLatLng([x, y]);
		};
	});

	afterEach(function () {
		document.body.removeChild(c);
	});

	it("opens on marker mouseover and close on mouseout", function () {
		var layer = new L.Marker(center).addTo(map);

		layer.bindLabel('Label');

		happen.mouseover(layer._icon, {relatedTarget: map._container});

		expect(map.hasLayer(layer._label)).to.be.true;

		happen.mouseout(layer._icon, {relatedTarget: map._container});
		expect(map.hasLayer(layer._label)).to.be.false;
	});

	it("stays open on marker when permanent", function () {
		var layer = new L.Marker(center).addTo(map);

		layer.bindLabel('Label', {permanent: true});
		expect(map.hasLayer(layer._label)).to.be.true;
	});

	it("is removed when removing marker", function () {
		var layer = new L.Marker(center).addTo(map);

		layer.bindLabel('Label', {permanent: true});
		expect(map.hasLayer(layer._label)).to.be.true;
		layer.remove();
		expect(map.hasLayer(layer._label)).to.be.false;
	});

	it("can be make interactive", function () {
		var layer = new L.Marker(center).addTo(map);
		var spy = sinon.spy();
		layer.on('click', spy);

		layer.bindLabel('Label', {permanent: true, interactive: true});
		happen.click(layer._label._container);
		expect(spy.calledOnce).to.be.true;
	});

	it("can be forced on left direction", function () {
		var layer = new L.Marker(center).addTo(map);
		var spy = sinon.spy();
		layer.on('click', spy);

		layer.bindLabel('A long label that should be displayed on the left', {permanent: true, direction: 'left', interactive: true});
		expect(map.hasLayer(layer._label)).to.be.true;
		happen.at('click', 150, 180);  // Marker is on the map center, which is 400px large.
		expect(spy.calledOnce).to.be.true;
	});

	it("can be forced on top direction", function () {
		var layer = new L.Marker(center).addTo(map);
		var spy = sinon.spy();
		layer.on('click', spy);

		layer.bindLabel('A label that should be displayed on the top', {permanent: true, direction: 'top', interactive: true});
		expect(map.hasLayer(layer._label)).to.be.true;
		happen.at('click', 200, 170);  // Marker is on the map center, which is 400px large.
		expect(spy.calledOnce).to.be.true;
	});

	it("can be forced on bottom direction", function () {
		var layer = new L.Marker(center).addTo(map);
		var spy = sinon.spy();
		layer.on('click', spy);

		layer.bindLabel('A label that should be displayed on the top', {permanent: true, direction: 'bottom', interactive: true});
		expect(map.hasLayer(layer._label)).to.be.true;
		happen.at('click', 200, 210);  // Marker is on the map center, which is 400px large.
		expect(spy.calledOnce).to.be.true;
	});

	it("can be forced on center", function () {
		var layer = new L.Marker(center).addTo(map);
		var spy = sinon.spy();
		layer.on('click', spy);

		layer.bindLabel('A label that should be displayed on the center', {permanent: true, direction: 'center', interactive: true});
		expect(map.hasLayer(layer._label)).to.be.true;
		happen.at('click', 150, 180);  // Marker is on the map center, which is 400px large.
		expect(spy.calledOnce).to.be.true;
	});

	it("honours opacity option", function () {
		var layer = new L.Marker(center).addTo(map);
		layer.bindLabel('Label', {permanent: true, opacity: 0.57});
		expect(layer._label._container.style.opacity).to.eql('0.57');
	});

	it("can change opacity with setOpacity", function () {
		var layer = new L.Marker(center).addTo(map);
		layer.bindLabel('Label', {permanent: true});
		expect(layer._label._container.style.opacity).to.eql('0.8');
		layer._label.setOpacity(0.57);
		expect(layer._label._container.style.opacity).to.eql('0.57');
	});

	it("it should use a label with a function as content with a FeatureGroup", function () {
		var marker1 = new L.Marker(new L.LatLng(55.8, 37.6), {description: "I'm marker 1."});
		var marker2 = new L.Marker(new L.LatLng(54.6, 38.2), {description: "I'm marker 2."});
		var group = new L.FeatureGroup([marker1, marker2]).addTo(map);

		group.bindLabel(function (layer) {
			return layer.options.description;
		});

		// toggle popup on marker1
		happen.mouseover(marker1._icon, {relatedTarget: map._container});
		expect(map.hasLayer(group._label)).to.be.true;
		expect(group._label._container.innerHTML).to.eql("I'm marker 1.");

		// toggle popup on marker2
		happen.mouseover(marker2._icon, {relatedTarget: map._container});
		expect(map.hasLayer(group._label)).to.be.true;
		expect(group._label._container.innerHTML).to.eql("I'm marker 2.");
	});

	it("opens on polygon mouseover and close on mouseout", function () {
		var layer = new L.Polygon([[55.8, 37.6], [55.9, 37.6], [55.8, 37.5]]).addTo(map);

		layer.bindLabel('Label');

		happen.mouseover(layer._path, {relatedTarget: map._container});

		expect(map.hasLayer(layer._label)).to.be.true;

		happen.mouseout(layer._path, {relatedTarget: map._container});
		expect(map.hasLayer(layer._label)).to.be.false;
	});

	it("stays open on polygon when permanent", function () {
		var layer = new L.Polygon([[55.8, 37.6], [55.9, 37.6], [55.8, 37.5]]).addTo(map);

		layer.bindLabel('Label', {permanent: true});
		expect(map.hasLayer(layer._label)).to.be.true;
	});

	it("opens on polyline mouseover and close on mouseout", function () {
		var layer = new L.Polyline([[55.8, 37.6], [55.9, 37.6], [55.8, 37.5]]).addTo(map);

		layer.bindLabel('Label');

		happen.mouseover(layer._path, {relatedTarget: map._container});

		expect(map.hasLayer(layer._label)).to.be.true;

		happen.mouseout(layer._path, {relatedTarget: map._container});
		expect(map.hasLayer(layer._label)).to.be.false;
	});

	it("stays open on marker when permanent", function () {
		var layer = new L.Polyline([[55.8, 37.6], [55.9, 37.6], [55.8, 37.5]]).addTo(map);

		layer.bindLabel('Label', {permanent: true});
		expect(map.hasLayer(layer._label)).to.be.true;
	});

});

