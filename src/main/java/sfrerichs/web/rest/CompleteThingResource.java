package sfrerichs.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * CompleteThingResource controller
 */
@RestController
@RequestMapping("/api/complete-thing")
public class CompleteThingResource {

    private final Logger log = LoggerFactory.getLogger(CompleteThingResource.class);

    /**
    * PUT markComplete
    */
    @PutMapping("/mark-complete")
    public String markComplete() {
        return "markComplete";
    }

}
