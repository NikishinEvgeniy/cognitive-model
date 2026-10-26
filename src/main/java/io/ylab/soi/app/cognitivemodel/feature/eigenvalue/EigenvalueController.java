package io.ylab.soi.app.cognitivemodel.feature.eigenvalue;

import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.mapper.EigenvalueMapper;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueDto;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueRequest;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.model.EigenvalueResponse;
import io.ylab.soi.app.cognitivemodel.feature.eigenvalue.service.EigenvalueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1")
public class EigenvalueController {

    private final EigenvalueMapper eigenvalueMapper;
    private final EigenvalueService eigenvalueService;

    @GetMapping("/matrix/{id}/eigenvalues")
    @ResponseStatus(HttpStatus.OK)
    public EigenvalueResponse getEigenvalues(@PathVariable("id") long id) {
        EigenvalueDto eigenvalue = eigenvalueMapper.map(eigenvalueRequest);
        return eigenvalueService.calculate(eigenvalue);
    }
}