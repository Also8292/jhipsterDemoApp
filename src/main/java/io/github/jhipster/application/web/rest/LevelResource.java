package io.github.jhipster.application.web.rest;
import io.github.jhipster.application.domain.Level;
import io.github.jhipster.application.repository.LevelRepository;
import io.github.jhipster.application.web.rest.errors.BadRequestAlertException;
import io.github.jhipster.application.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Level.
 */
@RestController
@RequestMapping("/api")
public class LevelResource {

    private final Logger log = LoggerFactory.getLogger(LevelResource.class);

    private static final String ENTITY_NAME = "level";

    private final LevelRepository levelRepository;

    public LevelResource(LevelRepository levelRepository) {
        this.levelRepository = levelRepository;
    }

    /**
     * POST  /levels : Create a new level.
     *
     * @param level the level to create
     * @return the ResponseEntity with status 201 (Created) and with body the new level, or with status 400 (Bad Request) if the level has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/levels")
    public ResponseEntity<Level> createLevel(@RequestBody Level level) throws URISyntaxException {
        log.debug("REST request to save Level : {}", level);
        if (level.getId() != null) {
            throw new BadRequestAlertException("A new level cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Level result = levelRepository.save(level);
        return ResponseEntity.created(new URI("/api/levels/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /levels : Updates an existing level.
     *
     * @param level the level to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated level,
     * or with status 400 (Bad Request) if the level is not valid,
     * or with status 500 (Internal Server Error) if the level couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/levels")
    public ResponseEntity<Level> updateLevel(@RequestBody Level level) throws URISyntaxException {
        log.debug("REST request to update Level : {}", level);
        if (level.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Level result = levelRepository.save(level);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, level.getId().toString()))
            .body(result);
    }

    /**
     * GET  /levels : get all the levels.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of levels in body
     */
    @GetMapping("/levels")
    public List<Level> getAllLevels() {
        log.debug("REST request to get all Levels");
        return levelRepository.findAll();
    }

    /**
     * GET  /levels/:id : get the "id" level.
     *
     * @param id the id of the level to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the level, or with status 404 (Not Found)
     */
    @GetMapping("/levels/{id}")
    public ResponseEntity<Level> getLevel(@PathVariable Long id) {
        log.debug("REST request to get Level : {}", id);
        Optional<Level> level = levelRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(level);
    }

    /**
     * DELETE  /levels/:id : delete the "id" level.
     *
     * @param id the id of the level to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/levels/{id}")
    public ResponseEntity<Void> deleteLevel(@PathVariable Long id) {
        log.debug("REST request to delete Level : {}", id);
        levelRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
