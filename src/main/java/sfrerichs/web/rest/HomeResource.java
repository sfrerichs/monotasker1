package sfrerichs.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * HomeResource controller
 */
@RestController
@RequestMapping("/api/home")
public class HomeResource {

    private final Logger log = LoggerFactory.getLogger(HomeResource.class);

    /**
    * GET showInfo
    */
    @GetMapping("/show-info")
    public String showInfo() {
        return "showInfo";
    }

}
