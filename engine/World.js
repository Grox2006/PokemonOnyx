/**
 * World - Represents a game world.
 *
 * @param {type} units the size units of reference (in pixels).
 * @param {type} actors the actors.
 * @param {type} camera the camera.
 * @param {type} interactions the triggerable interactions.
 * @param {type} layers the terrain layers matrices.
 */
function World(units, actors, camera, interactions, layers)
{
    this.units = units;

    var focus = undefined;
    if(actors)
    {
        this.actors = [];
        for(var actor of actors)
        {
            this.actors[actor.id] = new Actor(actor.name, actor.layer, actor.x, actor.y, actor.orientation, actor.animator, actor.behaviours);
            if(camera.focus == actor.id)
            {
                focus = this.actors[actor.id];
            }
        }
    }

    this.camera = new Camera(focus, camera.viewport, this.units);
    this.interactions = interactions;
    this.layers = layers;
}

World.prototype.getInteraction = function(id, key)
{
    var res = undefined;
    for(var interaction of this.interactions)
    {
        if(id == interaction.id && key == interaction.key)
        {
            res = interaction;
        }
    }

    return res;
}

World.prototype.getLayerData = function(layer, row, column)
{
    var res = 0;
    if(layer >= 0 && layer < this.layers.data.length && row >= 0 && row < this.layers.data[layer].length && column >= 0 && column < this.layers.data[layer][row].length)
    {
        res = this.layers.data[layer][row][column];
    }

    return res;
}

World.prototype.getLayerCollision = function(row, column)
{
    var res = 1;
    if(row >= 0 && row < this.layers.collision.length && column >= 0 && column < this.layers.collision[row].length)
    {
        res = this.layers.collision[row][column];
    }

    return res;
}

World.prototype.getLayerInteraction = function(row, column)
{
    var res = 0;
    if(row >= 0 && row < this.layers.interaction.length && column >= 0 && column < this.layers.interaction[row].length)
    {
        res = this.layers.interaction[row][column];
    }

    return res;
}

World.prototype.setLayerInteraction = function(row, column, value)
{
    var res = 0;
    if(row >= 0 && row < this.layers.interaction.length && column >= 0 && column < this.layers.interaction[row].length)
    {
        res = this.layers.interaction[row][column] = value;
    }
}
