package edu.cg.models.Car;

import java.util.LinkedList;
import java.util.List;

import com.jogamp.opengl.GL2;
import edu.cg.algebra.Point;
import edu.cg.algebra.Vec;
import edu.cg.models.BoundingSphere;
import edu.cg.models.IIntersectable;
import edu.cg.models.IRenderable;

public class Front implements IRenderable, IIntersectable {
	private FrontBumber frontBumper = new FrontBumber();
	private FrontHood hood = new FrontHood();
	private PairOfWheels wheels = new PairOfWheels();

	public Front() {
		this.frontBumper = new FrontBumber();
		this.hood = new FrontHood();
		this.wheels = new PairOfWheels();
	}

	@Override
	public void render(GL2 gl) {
		gl.glPushMatrix();

		// Render hood - Use Red Material.
		gl.glTranslated(-Specification.F_LENGTH / 2.0 + Specification.F_HOOD_LENGTH / 2.0, 0.0, 0.0);
		this.hood.render(gl);

		// Render the wheels.
		gl.glTranslated(Specification.F_HOOD_LENGTH / 2.0 - 1.25 * Specification.TIRE_RADIUS,
				0.5 * Specification.TIRE_RADIUS, 0.0);
		this.wheels.render(gl);

		// Render the front bumper.
		gl.glTranslated(1.25 * Specification.TIRE_RADIUS + Specification.F_BUMPER_LENGTH / 2.0,
				 -0.5 * Specification.TIRE_RADIUS, 0.0);
		this.frontBumper.render(gl);

		gl.glPopMatrix();
	}

	@Override
	public void init(GL2 gl) {
	}

	@Override
	public void destroy(GL2 gl) {

	}

	@Override
	public List<BoundingSphere> getBoundingSpheres() {
		LinkedList<BoundingSphere> boundingSpheres = new LinkedList<BoundingSphere>();

		double sphereRadius = new Vec(
				Specification.F_LENGTH / 2,
				Specification.F_HEIGHT / 2,
				Specification.F_DEPTH / 2).norm();
		Point centerPoint = new Point(0, (Specification.F_HEIGHT / 2.0), 0);

		BoundingSphere sphere = new BoundingSphere(sphereRadius, centerPoint);
		sphere.setSphereColor3d(1.0, 0.0, 0.0);

		boundingSpheres.add(sphere);
		return boundingSpheres;
	}

	@Override
	public String toString() {
		return "CarFront";
	}
}
