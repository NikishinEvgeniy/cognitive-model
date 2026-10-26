package io.ylab.soi.app.cognitivemodel.feature.eigenvalue.factory;

import org.apache.commons.math3.linear.EigenDecomposition;

import java.util.List;

public interface EigenFactory {
    EigenDecomposition create(List<List<Double>> matrix);
}