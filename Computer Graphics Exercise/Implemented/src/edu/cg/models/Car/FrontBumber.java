package edu.cg.models.Car;

import com.jogamp.opengl.GL2;

import com.jogamp.opengl.glu.GLU;
import com.jogamp.opengl.glu.GLUquadric;
import edu.cg.models.IRenderable;
import edu.cg.models.SkewedBox;


public class FrontBumber implements IRenderable {
	private SkewedBox wing1;
	private SkewedBox wing2;
	private SkewedBox baseBumper;
	private double frontLightRadius = 0.03;
	// Constructor
	public FrontBumber() {
		this.wing1 = new SkewedBox(Specification.F_BUMPER_LENGTH, Specification.F_BUMPER_WINGS_HEIGHT_1,
				Specification.F_BUMPER_WINGS_HEIGHT_2, Specification.F_BUMPER_WINGS_DEPTH,
				Specification.F_BUMPER_WINGS_DEPTH);
		this.wing2 = new SkewedBox(Specification.F_BUMPER_LENGTH, Specification.F_BUMPER_WINGS_HEIGHT_1,
				Specification.F_BUMPER_WINGS_HEIGHT_2, Specification.F_BUMPER_WINGS_DEPTH,
				Specification.F_BUMPER_WINGS_DEPTH);

		this.baseBumper = new SkewedBox(Specification.F_BUMPER_LENGTH, Specification.F_BUMPER_HEIGHT_1,
				Specification.F_BUMPER_HEIGHT_2, Specification.F_BUMPER_DEPTH,
				Specification.F_BUMPER_DEPTH);
	}

	@Override
	/**
	 *
	 */
	public void render(GL2 gl) {
		//render base.
		gl.glPushMatrix();
		Materials.SetLightPinkMetalMaterial(gl);
		this.baseBumper.render(gl);

		//render wings
		gl.glTranslated(0, 0, (Specification.F_BUMPER_DEPTH + Specification.F_BUMPER_WINGS_DEPTH) / 2.0);
		renderWings(wing1, gl);
		gl.glTranslated(0, 0, -(Specification.F_BUMPER_DEPTH + Specification.F_BUMPER_WINGS_DEPTH));
		renderWings(wing2, gl);
		gl.glPopMatrix();
	}

	private void renderWings(SkewedBox wing, GL2 gl) {
		//initializing GLU
		GLU glu = new GLU();
		GLUquadric q = glu.gluNewQuadric();

		gl.glPushMatrix();
		Materials.SetPinkMetalMaterial(gl);
		wing.render(gl);

		//recolor to yellow
		Materials.SetYellowMetalMaterial(gl);

		gl.glTranslated(0.0, (Specification.F_BUMPER_WINGS_HEIGHT_1 - Specification.F_BUMPER_WINGS_HEIGHT_2 -
						this.frontLightRadius) / 2.0 , 0.0);
		glu.gluSphere(q, this.frontLightRadius, 10, 10);
		gl.glPopMatrix();

		//clearing
		glu.gluDeleteQuadric(q);
	}


	@Override
	public void init(GL2 gl) {
	}

	@Override
	public void destroy(GL2 gl) {

	}

	@Override
	public String toString() {
		return "FrontBumper";
	}

}
